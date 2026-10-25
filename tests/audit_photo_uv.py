"""Read-only first-material-sample coverage regression. See README-photo-uv.md."""
from pathlib import Path
import argparse,hashlib,json,re,subprocess,sys,concurrent.futures
ap=argparse.ArgumentParser();ap.add_argument('repo',type=Path);ap.add_argument('--out',type=Path,required=True);ap.add_argument('--jobs',type=int,default=2);ap.add_argument('--coordinate-only',action='store_true');args=ap.parse_args()
repo=args.repo.resolve();out=args.out.resolve()
if out==repo or repo in out.parents:raise SystemExit("Audit output must be outside the repository")
out.mkdir(parents=True,exist_ok=True)
# These classifications are locked to audited fragment bytes, not broad ID exemptions.
EXCEPTIONS={'flaxen-hair': {'fragmentSHA256': '284457b2a700fb393812b8c986880ea35bad8433300ef7e257e18ed972d001f4', 'reason': 'Bounded alpha subject over procedural background; explicit inside factor is zero for coordinates outside material bounds.'}, 'pathetique-2': {'fragmentSHA256': '55bc274550c6b2455eefc04ad634a4f82a9e3516ff1467d6da5016e5e5eca58f', 'reason': 'Bounded alpha subject over procedural background; explicit inside factor is zero for coordinates outside material bounds.'}, 'liebestraum-3': {'fragmentSHA256': '7a096ed7493013cee75498582b159818296aa8e49e030f60074141e15b939b23', 'reason': 'Intentional dark field feather around isolated flame; not full photographic background coverage. Far outside support contributes zero.'}, 'traumerei': {'fragmentSHA256': '5868f3da187d4a18044f3281e4f31acebb767a569c5914684f21586298d99a60', 'reason': 'Bounded alpha subject over procedural background; explicit inside factor is zero for coordinates outside material bounds.'}, 'prelude-bwv846': {'fragmentSHA256': '479b664e804639001e1b161c9e6d36d5edd266e522682a12d10c634dc2afb060', 'reason': 'Bounded alpha subject over procedural background; explicit inside factor is zero for coordinates outside material bounds.'}}
RIGHT_ATLAS={'jelly','waltz','aurora','lightning','birds','samaras','snake','ray','butterfly'}
LEFT_ATLAS={'owl','foam'}
html=(repo/'index.html').read_text();scripts=re.findall(r'<script\s+src="(realism[^"?]+)(?:\?[^\"]*)?"',html)
node="const fs=require('fs'),vm=require('vm'),path=require('path');const [root,files]=process.argv.slice(1);const s={window:{}};vm.createContext(s);for(const f of JSON.parse(files))vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),s,{filename:f});process.stdout.write(JSON.stringify(s.window.ClassicaRealism.list()));"
catalog=json.loads(subprocess.check_output(['node','-e',node,str(repo),json.dumps(scripts)],text=True));assert len(catalog)==74,'Expected current74 catalog'
rows=[];photoids=set()
for filename in scripts:
 source=(repo/filename).read_text();assets=re.findall(r'assets/realism/[^\s\'\"`]+',source)
 if not assets:continue
 assert len(set(assets))==1,(filename,assets)
 asset=assets[0];match=re.search(r'const fragment=`\n([\s\S]*?)`;',source);assert match,filename;frag=match[1];sid=re.search(r"\bid\s*=\s*'([^']+)'",source)[1];photoids.add(sid);name=Path(filename).stem.replace('realism-nature-','')
 low,high=(.5,1.) if name in RIGHT_ATLAS else (0.,.5) if name in LEFT_ATLAS else (0.,1.)
 if 'atlas' in asset and name not in RIGHT_ATLAS|LEFT_ATLAS:raise AssertionError('Unclassified atlas domain: '+filename)
 inst=frag.replace('texture2D(', 'reviewTexture(').replace('void main()', 'void reviewMain()')
 head='precision highp float;\nbool reviewSeen=false;vec2 reviewUV=vec2(0.);\nvec4 reviewTexture(sampler2D s,vec2 v){if(!reviewSeen){reviewSeen=true;reviewUV=v;}return texture2D(s,v);}\n'
 inst=head+inst+f'\nvoid main(){{reviewMain();gl_FragColor=vec4((reviewUV.x<{low:.3f}||reviewUV.x>{high:.3f})?1.:0.,(reviewUV.y<0.||reviewUV.y>1.)?1.:0.,reviewSeen?0.:1.,1.);}}\n'
 local=out/name;local.mkdir(exist_ok=True);(local/'instrumented.frag').write_text(inst)
 rows.append({'name':name,'id':sid,'module':filename,'moduleSHA256':hashlib.sha256(source.encode()).hexdigest(),'fragmentSHA256':hashlib.sha256(frag.encode()).hexdigest(),'material':asset,'firstSampleDomain':[low,high,0,1],'out':str(local)})
def run(r):
 local=Path(r['out']);command=[sys.executable,str(Path(__file__).with_name('render_first_uv.py')),str(local/'instrumented.frag'),'--out',str(local)]
 if not args.coordinate_only:
  assert (repo/r['material']).is_file(),r['material'];command+=['--texture',str(repo/r['material'])]
 result=subprocess.run(command,capture_output=True,text=True);(local/'run.log').write_text(result.stdout+result.stderr)
 if result.returncode:return r|{'status':'ERROR','error':'See run.log'}
 data=json.loads((local/'uv-results.json').read_text());bad=[x for x in data if x['outsidePixels']];exception=EXCEPTIONS.get(r['id']);classification=None
 if exception and exception['fragmentSHA256']==r['fragmentSHA256']:classification=exception['reason']
 status='DOCUMENTED_COMPOSITE' if bad and classification else 'FAIL' if bad else 'PASS'
 return r|{'status':status,'classification':classification,'results':data}
with concurrent.futures.ThreadPoolExecutor(max_workers=max(1,args.jobs)) as pool:results=list(pool.map(run,rows))
report={'method':'First runtime material lookup, not all auxiliary lookups; atlas tile domains checked','coordinateOnly':args.coordinate_only,'coordinateOnlyReason':'First lookup coordinates cannot depend on a previous lookup; placeholder only when explicitly requested. Does not validate decoded assets.','catalog':74,'photoModules':len(rows),'noImageEntries':[x['id'] for x in catalog if x['id'] not in photoids],'results':results}
(out/'audit.json').write_text(json.dumps(report,indent=2));print(json.dumps({'photoModules':len(rows),'noImageEntries':report['noImageEntries'],'summary':[{k:r[k] for k in ['name','id','status']} for r in results]},indent=2));sys.exit(1 if any(r['status'] in ['FAIL','ERROR'] for r in results) else 0)

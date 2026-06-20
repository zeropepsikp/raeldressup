import os, json
from PIL import Image
# 원본 APC_assets 폴더 경로 (필요시 환경변수 APC_SRC로 지정)
SRC=os.environ.get('APC_SRC', os.path.expanduser('~/APC_assets')).rstrip('/')+'/'
DST=os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),'assets')+'/'
os.makedirs(DST,exist_ok=True)

def resize_save(rel, maxdim):
    im=Image.open(SRC+rel).convert('RGBA')
    w,h=im.size
    s=min(1.0, maxdim/max(w,h))
    nw,nh=max(1,int(w*s)),max(1,int(h*s))
    if s<1.0: im=im.resize((nw,nh),Image.LANCZOS)
    out=rel.replace(' ','_')
    os.makedirs(os.path.dirname(DST+out),exist_ok=True)
    im.save(DST+out,optimize=True)
    return out, nw, nh

# bodies
bodies=[]
for i in (3,1,2,4):  # default first = Body_3 (clean)
    out,w,h=resize_save(f'Body_Base/Body_{i}.png',1100)
    bodies.append({'id':f'body{i}','name':f'바디 {i}','file':out,'w':w,'h':h})

# anchor presets (cx,cy as frac of stageW/H ; w frac of stageW ; z)
AH=lambda: (0.565,0.105,0.42,45)   # hair head
ATOP=(0.50,0.30,0.53,30)
AJEAN=(0.47,0.63,0.52,20)
ASKIRT=(0.45,0.50,0.50,20)
ADRESS=(0.50,0.45,0.78,24)
ASHOE=(0.60,0.92,0.50,34)
ANECK=(0.55,0.26,0.20,40)
AEAR=(0.56,0.33,0.28,38)
ABOW=(0.565,0.115,0.46,50)
ASOCK=(0.55,0.82,0.50,7)
ATIGHT=(0.50,0.62,0.46,5)

def item(rel,name,cat,anchor,maxdim=900):
    out,w,h=resize_save(rel,maxdim)
    cx,cy,ww,z=anchor
    return {'id':os.path.splitext(out.split('/')[-1])[0].lower(),
            'name':name,'cat':cat,'file':out,'w':w,'h':h,
            'cx':cx,'cy':cy,'aw':ww,'z':z}

cats={'hair':[],'top':[],'bottom':[],'dress':[],'shoes':[],'acc':[]}

# hair (4 colors)
for col,kr in [('Black','블랙'),('Brunette','브라운'),('Blonde','블론드'),('Pink','핑크')]:
    cats['hair'].append(item(f'Body_Base/Base Hair {col}.png',f'헤어 {kr}','hair',AH(),900))

# tops: shirts + opt variants
shirt_names={'Shirt_1':'블라우스','Shirt_2':'스웨터','Shirt_3':'오프숄더'}
for base,kr in shirt_names.items():
    cats['top'].append(item(f'Clothes/{base}.png',kr,'top',ATOP))
    cats['top'].append(item(f'Clothes/{base}_opt_2.png',kr+' B','top',ATOP))

# bottoms: jeans + skirts
cats['bottom'].append(item('Clothes/Jeans.png','청바지','bottom',AJEAN))
cats['bottom'].append(item('Clothes/Jeans_opt_2.png','청바지 B','bottom',AJEAN))
for base,kr in [('Skirt_1','스커트 1'),('Skirt_2','스커트 2')]:
    cats['bottom'].append(item(f'Clothes/{base}.png',kr,'bottom',ASKIRT))
    cats['bottom'].append(item(f'Clothes/{base}_opt_2.png',kr+' B','bottom',ASKIRT))

# dresses
for base,kr in [('Dress_1','드레스 1'),('Dress_2','드레스 2')]:
    cats['dress'].append(item(f'Clothes/{base}.png',kr,'dress',ADRESS))
    cats['dress'].append(item(f'Clothes/{base}_opt_2.png',kr+' B','dress',ADRESS))

# shoes
cats['shoes'].append(item('Shoes/Shoes_1.png','운동화','shoes',ASHOE))
cats['shoes'].append(item('Shoes/Shoes_1_opt_2.png','운동화 B','shoes',ASHOE))
cats['shoes'].append(item('Shoes/Shoes_2.png','구두','shoes',ASHOE))
cats['shoes'].append(item('Shoes/Shoes_3.png','부츠','shoes',ASHOE))
cats['shoes'].append(item('Shoes/Shoes_3_opt_2.png','부츠 B','shoes',ASHOE))

# accessories (each its own anchor)
cats['acc'].append(item('Accessories/Acc_1.png','하트 목걸이','acc',ANECK))
cats['acc'].append(item('Accessories/Acc_2.png','이어폰','acc',AEAR))
cats['acc'].append(item('Accessories/Acc_3.png','리본','acc',ABOW))
cats['acc'].append(item('Accessories/Acc_3_opt_2.png','리본 B','acc',ABOW))
cats['acc'].append(item('Accessories/Acc_3_opt_3.png','리본 C','acc',ABOW))
cats['acc'].append(item('Accessories/Acc_4.png','양말','acc',ASOCK))
cats['acc'].append(item('Accessories/Acc_5.png','스타킹','acc',ATIGHT))

CAT_META=[('hair','헤어','💇'),('top','상의','👕'),('bottom','하의','👖'),
          ('dress','원피스','👗'),('shoes','신발','👟'),('acc','액세서리','🎀')]
categories=[{'id':cid,'name':nm,'icon':ic,'items':cats[cid]} for cid,nm,ic in CAT_META]

data={'bodies':bodies,'categories':categories}
js="/* 자동 생성됨 (gen.py). 업로드된 APC_assets 기반 */\nconst DATA = "+json.dumps(data,ensure_ascii=False,indent=1)+";\n"
open('/home/user/raeldressup/assets.js','w').write(js)
print("items:",sum(len(v) for v in cats.values()),"bodies:",len(bodies))

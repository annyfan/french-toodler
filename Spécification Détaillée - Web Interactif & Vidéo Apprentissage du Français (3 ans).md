# **Spécification Détaillée : Plateforme Interactive Web & Vidéo d'Apprentissage du Français (3 ans) / 3岁幼儿法语互动网页与视频系统详细设计**

# **1\. 概述与产品架构 (Overview & System Architecture)**

## **Target Audience**

The system targets early language learners aged **2.5 to 3.5 years (30–42 months)** within the context of **Quebec French (Français québécois)** development, alongside their parents, speech-language pathologists (SLPs), and early childhood educators (Éducateurs/Éducatrices en CPE).

## **Dual Platform Architecture**

                                  \+---------------------------------------+

                                  \|    Shared Vocabulary & Grammar DB     \|

                                  \|   (683 Words \+ 48 Syntactic Rules)    \|

                                  \+-------------------+-------------------+

                                                      \|

                   \+----------------------------------+----------------------------------+

                   \|                                                                     \|

                   v                                                                     v

\+------------------------------------+                                \+------------------------------------+

\|     1\. Web Application (PWA)       \|                                \|   2\. Video Generation Engine       \|

\|  \- React 19 \+ TypeScript \+ Vite    \|                                \|  \- Remotion / Motion Canvas        \|

\|  \- Web Audio API (Low Latency)     \|                                \|  \- 60-90s Micro-Episode Pipelines  \|

\|  \- HTML5 Canvas / Framer Motion    \|                                \|  \- Audio Stem & Synthesize Sync    \|

\|  \- Offline-first Service Worker    \|                                \|  \- Trilingual Dynamic Subtitles    \|

\+------------------+-----------------+                                \+------------------+-----------------+

                   \|                                                                     \|

                   v                                                                     v

\+------------------------------------+                                \+------------------------------------+

\|  Toddler UI (0-Text, Touch-First)  \|                                \|  Programmatic MP4 Render Pipeline  \|

\|  Parent Portal (CDI Analytics)     \|                                \|  Distribution (YouTube Kids / App) \|

\+------------------------------------+                                \+------------------------------------+

## **Core Design Principles**

* **0-Text Toddler Interface:** Zero textual elements inside the toddler interface module. Interactions rely exclusively on tactile gestures (tap, drag), spatial visual affordances, high-contrast imagery, and rich auditory cues.  
* **Immediate Auditory & Visual Feedback:** Visual responses occur within **\< 16ms** (60 FPS rendering frame boundary), and speech/SFX playback initiates within **\< 50ms** of touch release to build instant cause-and-effect cognitive mapping.  
* **Scaffolded Sentence Complexity:** Algorithmic pathing advances from isolated lexical items (e.g., *Auto*) to telegraphic 2-word units (*Auto papa*) and fully formulated grammatical structures (*C'est l'auto de papa*), tracking developmental milestones.  
* **Parental CDI Tracking Engine:** Integrated parent portal maps all real-time play events directly against the standardized **Quebec Macarthur-Bates Communicative Development Inventory (CDI)** assessment framework (Mots et Énoncés).

---

# **2\. 数据结构与 JSON Schema (Data Model)**

## **WordItem Schema**

{

  "\$schema": "http\://json-schema.org/draft-07/schema\#",

  "title": "WordItem",

  "type": "object",

  "properties": {

    "id": { "type": "string" },

    "fr": { "type": "string" },

    "en": { "type": "string" },

    "zh": { "type": "string" },

    "categoryId": { "type": "integer", "minimum": 1, "maximum": 21 },

    "subcategory": { "type": "string" },

    "phonetics": { "type": "string" },

    "audioUrl": { "type": "string", "format": "uri-reference" },

    "illustrationAsset": { "type": "string" },

    "animationType": { "type": "string", "enum": \["bounce", "shake", "scale", "wiggle", "float", "pop"\] },

    "tags": { "type": "array", "items": { "type": "string" } },

    "complexityLevel": { "type": "integer", "minimum": 1, "maximum": 3 }

  },

  "required": \["id", "fr", "en", "zh", "categoryId", "phonetics", "audioUrl", "illustrationAsset"\]

}

## **SentenceTemplate Schema**

{

  "\$schema": "http\://json-schema.org/draft-07/schema\#",

  "title": "SentenceTemplate",

  "type": "object",

  "properties": {

    "id": { "type": "string" },

    "level": { "type": "integer", "enum": \[1, 2\] },

    "prompt\_fr": { "type": "string" },

    "prompt\_zh": { "type": "string" },

    "prompt\_en": { "type": "string" },

    "targetSentence\_fr": { "type": "string" },

    "targetSentence\_en": { "type": "string" },

    "targetSentence\_zh": { "type": "string" },

    "blocks": {

      "type": "array",

      "items": { "type": "string" },

      "minItems": 2

    }

  },

  "required": \["id", "level", "prompt\_fr", "targetSentence\_fr", "blocks"\]

}

## **UserProgress Schema**

{

  "\$schema": "http\://json-schema.org/draft-07/schema\#",

  "title": "UserProgress",

  "type": "object",

  "properties": {

    "userId": { "type": "string" },

    "updatedAt": { "type": "string", "format": "date-time" },

    "vocabulary": {

      "type": "object",

      "additionalProperties": {

        "type": "string",

        "enum": \["NOT\_YET", "SOMETIMES", "OFTEN"\]

      }

    },

    "grammarPairs": {

      "type": "object",

      "additionalProperties": {

        "type": "string",

        "enum": \["LEVEL\_1\_TELEGRAPHIC", "LEVEL\_2\_GRAMMATICAL"\]

      }

    },

    "totalWordsMastered": { "type": "integer" }

  },

  "required": \["userId", "vocabulary", "grammarPairs"\]

}

---

# **3\. 全量三语词汇与句型数据库 (Complete Trilingual Vocabulary Database)**

## **1\. EFFETS SONORES ET SONS D'ANIMAUX (12)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| sfx\_01 | aïe | ouch | 哎哟 | /aj/ | sfx\_aie.svg |
| sfx\_02 | bêêê bêêê | baa baa | 咩咩 | /bɛ.bɛ/ | sfx\_bee.svg |
| sfx\_03 | cocorico | cock-a-doodle-doo | 喔喔喔 | /kɔ.kɔ.ʁi.ko/ | sfx\_cocorico.svg |
| sfx\_04 | coin coin | quack quack | 嘎嘎 | /kwɛ̃.kwɛ̃/ | sfx\_coin.svg |
| sfx\_05 | grr | grr | 吼 | /ɡʁː/ | sfx\_grr.svg |
| sfx\_06 | miam miam | yum yum | 好吃/嗷呜 | /mjam.mjam/ | sfx\_miam.svg |
| sfx\_07 | miaou | meow | 喵 | /mja.u/ | sfx\_miaou.svg |
| sfx\_08 | meuh | moo | 哞 | /mø/ | sfx\_meuh.svg |
| sfx\_09 | oh oh | uh-oh | 噢噢 | /o.o/ | sfx\_ohoh.svg |
| sfx\_10 | tchou tchou | choo choo | 呜呜(火车声) | /tʃu.tʃu/ | sfx\_tchoutchou.svg |
| sfx\_11 | vroum | vroom | 轰轰(汽车声) | /vʁum/ | sfx\_vroum.svg |
| sfx\_12 | wouf wouf | woof woof | 汪汪 | /wuf.wuf/ | sfx\_wouf.svg |

## **2\. ANIMAUX (41)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| ani\_01 | abeille | bee | 蜜蜂 | /a.bɛj/ | ani\_abeille.svg |
| ani\_02 | agneau | lamb | 小羊 | /a.ɲo/ | ani\_agneau.svg |
| ani\_03 | alligator/crocodile | alligator/crocodile | 鳄鱼 | /a.li.ɡa.tɔʁ/ | ani\_alligator.svg |
| ani\_04 | âne | donkey | 驴 | /ɑn/ | ani\_ane.svg |
| ani\_05 | animal | animal | 动物 | /a.ni.mal/ | ani\_animal.svg |
| ani\_06 | bibitte | bug/critter | 小虫子 | /bi.bit/ | ani\_bibitte.svg |
| ani\_07 | canard | duck | 鸭子 | /ka.naʁ/ | ani\_canard.svg |
| ani\_08 | chat | cat | 猫 | /ʃa/ | ani\_chat.svg |
| ani\_09 | cheval | horse | 马 | /ʃə.val/ | ani\_cheval.svg |
| ani\_10 | chevreuil | deer | 鹿 | /ʃəv.ʁœj/ | ani\_chevreuil.svg |
| ani\_11 | chien | dog | 狗 | /ʃjɛ̃/ | ani\_chien.svg |
| ani\_12 | cochon | pig | 猪 | /kɔ.ʃɔ̃/ | ani\_cochon.svg |
| ani\_13 | coq | rooster | 公鸡 | /kɔk/ | ani\_coq.svg |
| ani\_14 | dinde | turkey | 火鸡 | /dɛ̃d/ | ani\_dinde.svg |
| ani\_15 | écureuil | squirrel | 松鼠 | /e.ky.ʁœj/ | ani\_ecureuil.svg |
| ani\_16 | éléphant | elephant | 大象 | /e.le.fɑ̃/ | ani\_elephant.svg |
| ani\_17 | fourmi | ant | 蚂蚁 | /fuʁ.mi/ | ani\_fourmi.svg |
| ani\_18 | girafe | giraffe | 长颈鹿 | /ʒi.ʁaf/ | ani\_girafe.svg |
| ani\_19 | grenouille | frog | 青蛙 | /ɡʁə.nuj/ | ani\_grenouille.svg |
| ani\_20 | hibou | owl | 猫头鹰 | /i.bu/ | ani\_hibou.svg |
| ani\_21 | lapin | rabbit | 兔子 | /la.pɛ̃/ | ani\_lapin.svg |
| ani\_22 | lion | lion | 狮子 | /ljɔ̃/ | ani\_lion.svg |
| ani\_23 | loup | wolf | 狼 | /lu/ | ani\_loup.svg |
| ani\_24 | mouton | sheep | 绵羊 | /mu.tɔ̃/ | ani\_mouton.svg |
| ani\_25 | oie | goose | 鹅 | /wa/ | ani\_oie.svg |
| ani\_26 | oiseau | bird | 鸟 | /wa.zo/ | ani\_oiseau.svg |
| ani\_27 | orignal | moose | 驼鹿 | /ɔ.ʁi.ɲal/ | ani\_orignal.svg |
| ani\_28 | ours | bear | 熊 | /uʁs/ | ani\_ours.svg |
| ani\_29 | ourson/nounours | teddy bear/bear cub | 小熊/玩具熊 | /uʁ.sɔ̃/ | ani\_ourson.svg |
| ani\_30 | panda | panda | 熊猫 | /pɑ̃.da/ | ani\_panda.svg |
| ani\_31 | papillon | butterfly | 蝴蝶 | /pa.pi.jɔ̃/ | ani\_papillon.svg |
| ani\_32 | pingouin | penguin | 企鹅 | /pɛ̃.ɡwɛ̃/ | ani\_pingouin.svg |
| ani\_33 | poisson | fish | 鱼 | /pwa.sɔ̃/ | ani\_poisson.svg |
| ani\_34 | poule | hen | 母鸡 | /pul/ | ani\_poule.svg |
| ani\_35 | poulet | chicken | 鸡/鸡肉 | /pu.lɛ/ | ani\_poulet.svg |
| ani\_36 | singe | monkey | 猴子 | /sɛ̃ʒ/ | ani\_singe.svg |
| ani\_37 | souris | mouse | 老鼠 | /su.ʁi/ | ani\_souris.svg |
| ani\_38 | tigre | tiger | 老虎 | /tiɡʁ/ | ani\_tigre.svg |
| ani\_39 | tortue | turtle | 乌龟 | /tɔʁ.ty/ | ani\_tortue.svg |
| ani\_40 | vache | cow | 奶牛 | /vaʃ/ | ani\_vache.svg |
| ani\_41 | zèbre | zebra | 斑马 | /zɛbʁ/ | ani\_zebre.svg |

## **3\. VÉHICULES (14)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| veh\_01 | auto | car | 汽车 | /o.to/ | veh\_auto.svg |
| veh\_02 | autobus | bus | 公交车 | /o.to.bys/ | veh\_autobus.svg |
| veh\_03 | avion | airplane | 飞机 | /a.vjɔ̃/ | veh\_avion.svg |
| veh\_04 | bateau | boat | 轮船 | /ba.to/ | veh\_bateau.svg |
| veh\_05 | bicyclette | bicycle | 自行车 | /bi.si.klɛt/ | veh\_bicyclette.svg |
| veh\_06 | camion | truck | 卡车 | /ka.mjɔ̃/ | veh\_camion.svg |
| veh\_07 | camion de pompier | fire truck | 消防车 | /ka.mjɔ̃.də.pɔ̃.pje/ | veh\_pompier.svg |
| veh\_08 | hélicoptère | helicopter | 直升机 | /e.li.kɔp.tɛʁ/ | veh\_helicoptere.svg |
| veh\_09 | moto | motorcycle | 摩托车 | /mɔ.to/ | veh\_moto.svg |
| veh\_10 | poussette | stroller | 婴儿推车 | /pu.sɛt/ | veh\_poussette.svg |
| veh\_11 | tracteur | tractor | 拖拉机 | /tʁak.tœʁ/ | veh\_tracteur.svg |
| veh\_12 | train | train | 火车 | /tʁɛ̃/ | veh\_train.svg |
| veh\_13 | traîneau | sled | 雪橇 | /tʁɛ.no/ | veh\_traineau.svg |
| veh\_14 | tricycle | tricycle | 三轮童车 | /tʁi.sikl/ | veh\_tricycle.svg |

## **4\. JOUETS (20)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| toy\_01 | balle | small ball | 小球 | /bal/ | toy\_balle.svg |
| toy\_02 | ballon | balloon/big ball | 气球/皮球 | /ba.lɔ̃/ | toy\_ballon.svg |
| toy\_03 | bâton | stick | 木棍 | /bɑ.tɔ̃/ | toy\_baton.svg |
| toy\_04 | bloc | block | 积木 | /blɔk/ | toy\_bloc.svg |
| toy\_05 | bulles | bubbles | 泡泡 | /byl/ | toy\_bulles.svg |
| toy\_06 | cadeau | gift | 礼物 | /ka.do/ | toy\_cadeau.svg |
| toy\_07 | casse-tête | puzzle | 拼图 | /kɑs.tɛt/ | toy\_cassatete.svg |
| toy\_08 | colle | glue | 胶水 | /kɔl/ | toy\_colle.svg |
| toy\_09 | craie | chalk | 粉笔 | /kʁɛ/ | toy\_craie.svg |
| toy\_10 | crayon | pencil/crayon | 铅笔/蜡笔 | /kʁɛ.jɔ̃/ | toy\_crayon.svg |
| toy\_11 | crayon de couleur | colored pencil | 彩色笔 | /kʁɛ.jɔ̃.də.ku.lœʁ/ | toy\_crayon\_couleur.svg |
| toy\_12 | histoire | story | 故事 | /is.twaʁ/ | toy\_histoire.svg |
| toy\_13 | jeu | game | 游戏 | /ʒø/ | toy\_jeu.svg |
| toy\_14 | jouet | toy | 玩具 | /ʒwɛ/ | toy\_jouet.svg |
| toy\_15 | lego | LEGO | 乐高积木 | /le.ɡo/ | toy\_lego.svg |
| toy\_16 | livre | book | 书 | /livʁ/ | toy\_livre.svg |
| toy\_17 | pâte à modeler | playdough | 橡皮泥 | /pɑt.a.mɔd.le/ | toy\_pate\_modeler.svg |
| toy\_18 | poupée | doll | 洋娃娃 | /pu.pe/ | toy\_poupee.svg |
| toy\_19 | stylo | pen | 圆珠笔 | /sti.lo/ | toy\_stylo.svg |
| toy\_20 | toutou | stuffed animal/plushie | 毛绒玩具 | /tu.tu/ | toy\_toutou.svg |

## **5\. NOURRITURE ET BOISSONS (67)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| foo\_01 | banane | banana | 香蕉 | /ba.nan/ | foo\_banane.svg |
| foo\_02 | beigne | donut | 甜甜圈 | /bɛɲ/ | foo\_beigne.svg |
| foo\_03 | beurre | butter | 黄油 | /bœʁ/ | foo\_beurre.svg |
| foo\_04 | beurre de pinotte/d'arachide | peanut butter | 花生酱 | /bœʁ.də.pi.nɔt/ | foo\_beurre\_pinotte.svg |
| foo\_05 | biscuit | cookie/biscuit | 饼干 | /bis.kɥi/ | foo\_biscuit.svg |
| foo\_06 | biscuit soda | saltine cracker | 苏打饼干 | /bis.kɥi.so.da/ | foo\_biscuit\_soda.svg |
| foo\_07 | blé d'inde | corn | 玉米 | /ble.dɛ̃d/ | foo\_ble\_dinde.svg |
| foo\_08 | bonbon | candy | 糖果 | /bɔ̃.bɔ̃/ | foo\_bonbon.svg |
| foo\_09 | café | coffee | 咖啡 | /ka.fe/ | foo\_cafe.svg |
| foo\_10 | carotte | carrot | 胡萝卜 | /ka.ʁɔt/ | foo\_carotte.svg |
| foo\_11 | céréale | cereal | 麦片 | /se.ʁe.al/ | foo\_cereale.svg |
| foo\_12 | Cheerios | Cheerios cereal | 圈圈麦片 | /tʃi.ʁi.os/ | foo\_cheerios.svg |
| foo\_13 | chips | chips | 薯片 | /tʃips/ | foo\_chips.svg |
| foo\_14 | chocolat | chocolate | 巧克力 | /ʃɔ.kɔ.la/ | foo\_chocolat.svg |
| foo\_15 | citrouille | pumpkin | 南瓜 | /si.tʁuj/ | foo\_citrouille.svg |
| foo\_16 | coke | coke/cola | 可乐 | /kɔk/ | foo\_coke.svg |
| foo\_17 | compote aux pommes | applesauce | 苹果泥 | /kɔ̃.pɔt.o.pɔm/ | foo\_compote.svg |
| foo\_18 | confiture | jam | 果酱 | /kɔ̃.fi.tyʁ/ | foo\_confiture.svg |
| foo\_19 | cornichon | pickle | 腌黄瓜 | /kɔʁ.ni.ʃɔ̃/ | foo\_cornichon.svg |
| foo\_20 | crème glacée | ice cream | 冰淇淋 | /kʁɛm.ɡla.se/ | foo\_creme\_glacee.svg |
| foo\_21 | crêpe | pancake/crepe | 薄煎饼 | /kʁɛp/ | foo\_crepe.svg |
| foo\_22 | eau | water | 水 | /o/ | foo\_eau.svg |
| foo\_23 | fraise | strawberry | 草莓 | /fʁɛz/ | foo\_fraise.svg |
| foo\_24 | fromage | cheese | 奶酪 | /fʁɔ.maʒ/ | foo\_fromage.svg |
| foo\_25 | gâteau | cake | 蛋糕 | /ɡɑ.to/ | foo\_gateau.svg |
| foo\_26 | glace | ice | 冰块 | /ɡlas/ | foo\_glace.svg |
| foo\_27 | gomme | chewing gum | 口香糖 | /ɡɔm/ | foo\_gomme.svg |
| foo\_28 | hamburger | burger | 汉堡 | /am.bœʁ.ɡœʁ/ | foo\_hamburger.svg |
| foo\_29 | haricot | bean | 豆角 | /a.ʁi.ko/ | foo\_haricot.svg |
| foo\_30 | Jell-o | jello/gelatin | 果冻 | /dʒɛl.o/ | foo\_jello.svg |
| foo\_31 | jus | juice | 果汁 | /ʒy/ | foo\_jus.svg |
| foo\_32 | lait | milk | 牛奶 | /lɛ/ | foo\_lait.svg |
| foo\_33 | melon | melon | 甜瓜 | /mə.lɔ̃/ | foo\_melon.svg |
| foo\_34 | muffin | muffin | 玛芬蛋糕 | /mɔ.fɛn/ | foo\_muffin.svg |
| foo\_35 | noix | nuts | 坚果/核桃 | /nwa/ | foo\_noix.svg |
| foo\_36 | nouilles/pates | noodles/pasta | 面条/意面 | /nuj/ | foo\_nouilles.svg |
| foo\_37 | nourriture | food | 食物 | /nu.ʁi.tyʁ/ | foo\_nourriture.svg |
| foo\_38 | oeuf | egg | 鸡蛋 | /œf/ | foo\_oeuf.svg |
| foo\_39 | orange | orange | 橙子 | /ɔ.ʁɑ̃ʒ/ | foo\_orange.svg |
| foo\_40 | pain | bread | 面包 | /pɛ̃/ | foo\_pain.svg |
| foo\_41 | patate | potato | 土豆 | /pa.tat/ | foo\_patate.svg |
| foo\_42 | patates frites | french fries | 薯条 | /pa.tat.fʁit/ | foo\_frites.svg |
| foo\_43 | pizza | pizza | 披萨 | /pit.sa/ | foo\_pizza.svg |
| foo\_44 | pois | peas | 豌豆 | /pwa/ | foo\_pois.svg |
| foo\_45 | poisson | fish | 鱼肉 | /pwa.sɔ̃/ | foo\_poisson\_plat.svg |
| foo\_46 | pomme | apple | 苹果 | /pɔm/ | foo\_pomme.svg |
| foo\_47 | pop-corn | popcorn | 爆米花 | /pɔp.kɔʁn/ | foo\_popcorn.svg |
| foo\_48 | Popsicle | popsicle | 冰棒 | /pɔp.si.kəl/ | foo\_popsicle.svg |
| foo\_49 | pouding | pudding | 布丁 | /pu.diŋ/ | foo\_pouding.svg |
| foo\_50 | poulet | chicken | 鸡肉 | /pu.lɛ/ | foo\_poulet\_cuit.svg |
| foo\_51 | raisin | grape | 葡萄 | /ʁɛ.zɛ̃/ | foo\_raisin.svg |
| foo\_52 | raisin sec | raisin | 葡萄干 | /ʁɛ.zɛ̃.sɛk/ | foo\_raisin\_sec.svg |
| foo\_53 | sandwich | sandwich | 三明治 | /sɑ̃.dwitʃ/ | foo\_sandwich.svg |
| foo\_54 | sauce | sauce | 酱汁 | /sos/ | foo\_sauce.svg |
| foo\_55 | sel | salt | 盐 | /sɛl/ | foo\_sel.svg |
| foo\_56 | soupe | soup | 汤 | /sup/ | foo\_soupe.svg |
| foo\_57 | spaghetti | spaghetti | 意大利面 | /spa.ɡɛ.ti/ | foo\_spaghetti.svg |
| foo\_58 | suçon | lollipop | 棒棒糖 | /sy.sɔ̃/ | foo\_sucon.svg |
| foo\_59 | thon | tuna | 金枪鱼 | /tɔ̃/ | foo\_thon.svg |
| foo\_60 | toast | toast | 烤面包片 | /tost/ | foo\_toast.svg |
| foo\_61 | vanille | vanilla | 香草 | /va.nij/ | foo\_vanille.svg |
| foo\_62 | viande | meat | 肉 | /vjɑ̃d/ | foo\_viande.svg |
| foo\_63 | vitamine | vitamin | 维生素 | /vi.ta.min/ | foo\_vitamine.svg |
| foo\_64 | yogourt | yogurt | 酸奶 | /jɔ.ɡuʁt/ | foo\_yogourt.svg |

## **6\. VÊTEMENTS (27)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| clo\_01 | bas | sock | 袜子 | /ba/ | clo\_bas.svg |
| clo\_02 | bavette | bib | 围兜 | /ba.vɛt/ | clo\_bavette.svg |
| clo\_03 | botte | boot | 靴子 | /bɔt/ | clo\_botte.svg |
| clo\_04 | bouton | button | 纽扣 | /bu.tɔ̃/ | clo\_bouton.svg |
| clo\_05 | ceinture | belt | 腰带 | /sɛ̃.tyʁ/ | clo\_ceinture.svg |
| clo\_06 | chandail | sweater/shirt | 毛衣/上衣 | /ʃɑ̃.daj/ | clo\_chandail.svg |
| clo\_07 | chapeau | hat | 帽子 | /ʃa.po/ | clo\_chapeau.svg |
| clo\_08 | chemise | shirt | 衬衫 | /ʃə.miz/ | clo\_chemise.svg |
| clo\_09 | collants | tights | 连裤袜 | /kɔ.lɑ̃/ | clo\_collants.svg |
| clo\_10 | collier | necklace | 项链 | /kɔ.lje/ | clo\_collier.svg |
| clo\_11 | couche | diaper | 尿布 | /kuʃ/ | clo\_couche.svg |
| clo\_12 | espadrille/soulier de course | sneaker/running shoe | 运动鞋 | /ɛs.pa.dʁij/ | clo\_espadrille.svg |
| clo\_13 | foulard | scarf | 围巾 | /fu.laʁ/ | clo\_foulard.svg |
| clo\_14 | gant | glove | 手套 | /ɡɑ̃/ | clo\_gant.svg |
| clo\_15 | habit de neige | snowsuit | 雪服/连体棉服 | /a.bi.də.nɛʒ/ | clo\_habit\_neige.svg |
| clo\_16 | jeans | jeans | 牛仔裤 | /dʒin/ | clo\_jeans.svg |
| clo\_17 | manteau | coat | 外套大衣 | /mɑ̃.to/ | clo\_manteau.svg |
| clo\_18 | mitaine | mitten | 连指手套 | /mi.tɛn/ | clo\_mitaine.svg |
| clo\_19 | pantalon | pants | 裤子 | /pɑ̃.ta.lɔ̃/ | clo\_pantalon.svg |
| clo\_20 | pantoufle | slipper | 拖鞋 | /pɑ̃.tufl/ | clo\_pantoufle.svg |
| clo\_21 | perles/boules | beads | 珠子/串珠 | /pɛʁl/ | clo\_perles.svg |
| clo\_22 | petite culotte/culotte | underwear/panties | 内裤 | /pə.tit.ky.lɔt/ | clo\_culotte.svg |
| clo\_23 | pyjama | pyjamas | 睡衣 | /pi.ʒa.ma/ | clo\_pyjama.svg |
| clo\_24 | robe | dress | 连衣裙 | /ʁɔb/ | clo\_robe.svg |
| clo\_25 | short | shorts | 短裤 | /ʃɔʁt/ | clo\_short.svg |
| clo\_26 | soulier | shoe | 鞋子 | /su.lje/ | clo\_soulier.svg |
| clo\_27 | zip/fermeture-éclair | zipper | 拉链 | /zip/ | clo\_zip.svg |

## **7\. PARTIES DU CORPS (27)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| bod\_01 | bedaine/ventre | tummy/belly | 小肚子 | /bə.dɛn/ | bod\_bedaine.svg |
| bod\_02 | bobo | boo-boo/hurt | 伤口/痛痛 | /bo.bo/ | bod\_bobo.svg |
| bod\_03 | bouche | mouth | 嘴巴 | /buʃ/ | bod\_bouche.svg |
| bod\_04 | bras | arm | 手臂 | /bʁa/ | bod\_bras.svg |
| bod\_05 | cheveux | hair | 头发 | /ʃə.vø/ | bod\_cheveux.svg |
| bod\_06 | dent | tooth | 牙齿 | /dɑ̃/ | bod\_dent.svg |
| bod\_07 | doigt | finger | 手指 | /dwa/ | bod\_doigt.svg |
| bod\_08 | épaule | shoulder | 肩膀 | /e.pol/ | bod\_epaule.svg |
| bod\_09 | fesses | buttocks | 屁股 | /fɛs/ | bod\_fesses.svg |
| bod\_10 | genou | knee | 膝盖 | /ʒə.nu/ | bod\_genou.svg |
| bod\_11 | jambe | leg | 腿 | /ʒɑ̃b/ | bod\_jambe.svg |
| bod\_12 | joue | cheek | 脸颊 | /ʒu/ | bod\_joue.svg |
| bod\_13 | langue | tongue | 舌头 | /lɑ̃ɡ/ | bod\_langue.svg |
| bod\_14 | lèvres | lips | 嘴唇 | /lɛvʁ/ | bod\_levres.svg |
| bod\_15 | main | hand | 手 | /mɛ̃/ | bod\_main.svg |
| bod\_16 | menton | chin | 下巴 | /mɑ̃.tɔ̃/ | bod\_menton.svg |
| bod\_17 | moustache | mustache | 胡须 | /mus.taʃ/ | bod\_moustache.svg |
| bod\_18 | nez | nose | 鼻子 | /ne/ | bod\_nez.svg |
| bod\_19 | nombril | belly button | 肚脐 | /nɔ̃.bʁi/ | bod\_nombril.svg |
| bod\_20 | oreille | ear | 耳朵 | /ɔ.ʁɛj/ | bod\_oreille.svg |
| bod\_21 | orteil | toe | 脚趾 | /ɔʁ.tɛj/ | bod\_orteil.svg |
| bod\_22 | pénis | penis | 阴茎 | /pe.nis/ | bod\_penis.svg |
| bod\_23 | pied | foot | 脚 | /pje/ | bod\_pied.svg |
| bod\_24 | tête | head | 头 | /tɛt/ | bod\_tete.svg |
| bod\_25 | vagin/vulve | vagina/vulva | 阴部 | /va.ʒɛ̃/ | bod\_vagin.svg |
| bod\_26 | visage | face | 脸 | /vi.zaʒ/ | bod\_visage.svg |
| bod\_27 | yeux | eyes | 眼睛 | /jø/ | bod\_yeux.svg |

## **8\. PETITS ARTICLES MÉNAGERS (48)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| hou\_01 | argent | money | 钱 | /aʁ.ʒɑ̃/ | hou\_argent.svg |
| hou\_02 | aspirateur | vacuum cleaner | 吸尘器 | /as.pi.ʁa.tœʁ/ | hou\_aspirateur.svg |
| hou\_03 | assiette | plate | 盘子 | /a.sjɛt/ | hou\_assiette.svg |
| hou\_04 | balai | broom | 扫把 | /ba.lɛ/ | hou\_balai.svg |
| hou\_05 | boîte | box | 盒子 | /bwɑt/ | hou\_boite.svg |
| hou\_06 | bol | bowl | 碗 | /bɔl/ | hou\_bol.svg |
| hou\_07 | bouteille | bottle | 水瓶/瓶子 | /bu.tɛj/ | hou\_bouteille.svg |
| hou\_08 | brosse | hairbrush | 梳子/刷子 | /bʁɔs/ | hou\_brosse.svg |
| hou\_09 | brosse à dent | toothbrush | 牙刷 | /bʁɔs.a.dɑ̃/ | hou\_brosse\_dent.svg |
| hou\_10 | caméra | camera | 相机 | /ka.me.ʁa/ | hou\_camera.svg |
| hou\_11 | ciseaux | scissors | 剪刀 | /si.zo/ | hou\_ciseaux.svg |
| hou\_12 | clés | keys | 钥匙 | /kle/ | hou\_cles.svg |
| hou\_13 | clou | nail | 钉子 | /klu/ | hou\_clou.svg |
| hou\_14 | couteau | knife | 小刀 | /ku.to/ | hou\_couteau.svg |
| hou\_15 | couverte/couverture | blanket | 被子/毯子 | /ku.vɛʁt/ | hou\_couverte.svg |
| hou\_16 | cuillère | spoon | 勺子 | /kɥi.jɛʁ/ | hou\_cuillere.svg |
| hou\_17 | fourchette | fork | 叉子 | /fuʁ.ʃɛt/ | hou\_fourchette.svg |
| hou\_18 | horloge | clock | 挂钟 | /ɔʁ.lɔʒ/ | hou\_horloge.svg |
| hou\_19 | image | picture | 画面/图画 | /i.maʒ/ | hou\_image.svg |
| hou\_20 | lampe | lamp | 台灯 | /lɑ̃p/ | hou\_lampe.svg |
| hou\_21 | lumière | light | 灯光/电灯 | /ly.mjɛʁ/ | hou\_lumiere.svg |
| hou\_22 | lunettes | glasses | 眼镜 | /ly.nɛt/ | hou\_lunettes.svg |
| hou\_23 | marteau | hammer | 锤子 | /maʁ.to/ | hou\_marteau.svg |
| hou\_24 | médicament | medicine | 药 | /me.di.ka.mɑ̃/ | hou\_medicament.svg |
| hou\_25 | montre | watch | 手表 | /mɔ̃tʁ/ | hou\_montre.svg |
| hou\_26 | mouchoir/Kleenex | tissue | 纸巾 | /mu.ʃwaʁ/ | hou\_mouchoir.svg |
| hou\_27 | oreiller | pillow | 枕头 | /ɔ.ʁɛ.je/ | hou\_oreiller.svg |
| hou\_28 | panier | basket | 篮子 | /pa.nje/ | hou\_panier.svg |
| hou\_29 | papier | paper | 纸 | /pa.pje/ | hou\_papier.svg |
| hou\_30 | peigne | comb | 细齿梳 | /pɛɲ/ | hou\_peigne.svg |
| hou\_31 | photo | photograph | 照片 | /fɔ.to/ | hou\_photo.svg |
| hou\_32 | plante | plant | 植物盆栽 | /plɑ̃t/ | hou\_plante.svg |
| hou\_33 | plat | dish | 菜盘/浅盘 | /pla/ | hou\_plat.svg |
| hou\_34 | pot | jar/pot | 罐子/盆 | /po/ | hou\_pot.svg |
| hou\_35 | poubelle | trash can | 垃圾桶 | /pu.bɛl/ | hou\_poubelle.svg |
| hou\_36 | radio | radio | 收音机 | /ʁa.djo/ | hou\_radio.svg |
| hou\_37 | ruban | tape/ribbon | 胶带/丝带 | /ʁy.bɑ̃/ | hou\_ruban.svg |
| hou\_38 | sacoche/sac à main | purse/handbag | 手提包 | /sa.kɔʃ/ | hou\_sacoche.svg |
| hou\_39 | savon | soap | 肥皂 | /sa.vɔ̃/ | hou\_savon.svg |
| hou\_40 | seau | bucket | 水桶 | /so/ | hou\_seau.svg |
| hou\_41 | serviette | towel | 毛巾/浴巾 | /sɛʁ.vjɛt/ | hou\_serviette.svg |
| hou\_42 | serviette de table | napkin | 餐巾纸 | /sɛʁ.vjɛt.də.tabl/ | hou\_serviette\_table.svg |
| hou\_43 | sou | penny/coin | 硬币 | /su/ | hou\_sou.svg |
| hou\_44 | tasse | cup/mug | 马克杯/杯子 | /tɑs/ | hou\_tasse.svg |
| hou\_45 | téléphone | telephone | 电话 | /te.le.fɔn/ | hou\_telephone.svg |
| hou\_46 | verre | drinking glass | 玻璃杯 | /vɛʁ/ | hou\_verre.svg |
| hou\_47 | vidanges | garbage | 垃圾 | /vi.dɑ̃ʒ/ | hou\_vidanges.svg |

## **9\. MEUBLES ET PIÈCES (35)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| fur\_01 | bain | bathtub | 浴缸 | /bɛ̃/ | fur\_bain.svg |
| fur\_02 | banc | bench | 长凳 | /bɑ̃/ | fur\_banc.svg |
| fur\_03 | bassinette/berceau | crib/cradle | 婴儿床 | /ba.si.nɛt/ | fur\_bassinette.svg |
| fur\_04 | chaise | chair | 椅子 | /ʃɛz/ | fur\_chaise.svg |
| fur\_05 | chaise berçante | rocking chair | 摇椅 | /ʃɛz.bɛʁ.sɑ̃t/ | fur\_chaise\_bercante.svg |
| fur\_06 | chaise haute | high chair | 儿童高脚餐椅 | /ʃɛz.ot/ | fur\_chaise\_haute.svg |
| fur\_07 | chambre | bedroom | 卧室 | /ʃɑ̃bʁ/ | fur\_chambre.svg |
| fur\_08 | cuisine | kitchen | 厨房 | /kɥi.zin/ | fur\_cuisine.svg |
| fur\_09 | divan/sofa | couch/sofa | 沙发 | /di.vɑ̃/ | fur\_divan.svg |
| fur\_10 | douche | shower | 淋浴 | /duʃ/ | fur\_douche.svg |
| fur\_11 | entrée | entryway | 玄关/入口 | /ɑ̃.tʁe/ | fur\_entree.svg |
| fur\_12 | escalier | stairs | 楼梯 | /ɛs.ka.lje/ | fur\_escalier.svg |
| fur\_13 | évier/lavabo | sink | 水槽/洗手池 | /e.vje/ | fur\_evier.svg |
| fur\_14 | fenêtre | window | 窗户 | /fə.nɛtʁ/ | fur\_fenetre.svg |
| fur\_15 | four | oven | 烤箱 | /fuʁ/ | fur\_four.svg |
| fur\_16 | foyer | fireplace | 壁炉 | /fwa.je/ | fur\_foyer.svg |
| fur\_17 | frigidaire/frigo | refrigerator | 冰箱 | /fʁi.ʒi.dɛʁ/ | fur\_frigidaire.svg |
| fur\_18 | garage | garage | 车库 | /ɡa.ʁaʒ/ | fur\_garage.svg |
| fur\_19 | garde-robe | closet | 衣柜 | /ɡaʁd.ʁɔb/ | fur\_garderobe.svg |
| fur\_20 | laveuse | washing machine | 洗衣机 | /la.vøz/ | fur\_laveuse.svg |
| fur\_21 | lit | bed | 床 | /li/ | fur\_lit.svg |
| fur\_22 | marche | step | 台阶 | /maʁʃ/ | fur\_marche.svg |
| fur\_23 | parc d'enfant | playpen | 游戏围栏 | /paʁk.dɑ̃.fɑ̃/ | fur\_parc\_enfant.svg |
| fur\_24 | pièce | room | 房间 | /pjɛs/ | fur\_piece.svg |
| fur\_25 | poêle | stove | 炉灶 | /pwal/ | fur\_poele.svg |
| fur\_26 | porte | door | 门 | /pɔʁt/ | fur\_porte.svg |
| fur\_27 | pot | potty | 便盆 | /po/ | fur\_pot.svg |
| fur\_28 | salle de bain/toilette | bathroom | 卫生间/洗手间 | /sal.də.bɛ̃/ | fur\_salle\_bain.svg |
| fur\_29 | salon | living room | 客厅 | /sa.lɔ̃/ | fur\_salon.svg |
| fur\_30 | sécheuse | dryer | 烘干机 | /se.ʃøz/ | fur\_secheuse.svg |
| fur\_31 | sous-sol | basement | 地下室 | /su.sɔl/ | fur\_sous\_sol.svg |
| fur\_32 | table | table | 桌子 | /tabl/ | fur\_table.svg |
| fur\_33 | télévision | television | 电视 | /te.le.vi.zjɔ̃/ | fur\_television.svg |
| fur\_34 | tiroir | drawer | 抽屉 | /ti.ʁwaʁ/ | fur\_tiroir.svg |

## **10\. CHOSES DE L'EXTÉRIEUR (33)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| out\_01 | arbre | tree | 树 | /aʁbʁ/ | out\_arbre.svg |
| out\_02 | arrosoir | watering can | 浇水壶 | /a.ʁɔ.zwaʁ/ | out\_arrosoir.svg |
| out\_03 | balançoire | swing | 秋千 | /ba.lɑ̃.swaʁ/ | out\_balancoire.svg |
| out\_04 | bâton | stick | 木棍 | /bɑ.tɔ̃/ | out\_baton.svg |
| out\_05 | bonhomme de neige | snowman | 雪人 | /bɔ.nɔm.də.nɛʒ/ | out\_bonhomme\_neige.svg |
| out\_06 | ciel | sky | 天空 | /sjɛl/ | out\_ciel.svg |
| out\_07 | cour | backyard/yard | 院子 | /kuʁ/ | out\_cour.svg |
| out\_08 | drapeau | flag | 旗帜 | /dʁa.po/ | out\_drapeau.svg |
| out\_09 | eau | water | 水 | /o/ | out\_eau.svg |
| out\_10 | échelle | ladder | 梯子 | /e.ʃɛl/ | out\_echelle.svg |
| out\_11 | étoile | star | 星星 | /e.twal/ | out\_etoile.svg |
| out\_12 | fleur | flower | 花 | /flœʁ/ | out\_fleur.svg |
| out\_13 | gazon | lawn/grass | 草坪 | /ɡa.zɔ̃/ | out\_gazon.svg |
| out\_14 | glissoire | slide | 滑梯 | /ɡli.swaʁ/ | out\_glissoire.svg |
| out\_15 | jardin | garden | 花园/菜园 | /ʒaʁ.dɛ̃/ | out\_jardin.svg |
| out\_16 | lune | moon | 月亮 | /lyn/ | out\_lune.svg |
| out\_17 | neige | snow | 雪 | /nɛʒ/ | out\_neige.svg |
| out\_18 | nuage | cloud | 云 | /ny.aʒ/ | out\_nuage.svg |
| out\_19 | pelle | shovel | 铲子 | /pɛl/ | out\_pelle.svg |
| out\_20 | pierre | stone | 石头 | /pjɛʁ/ | out\_pierre.svg |
| out\_21 | piscine | swimming pool | 游泳池 | /pi.sin/ | out\_piscine.svg |
| out\_22 | pluie | rain | 雨 | /plɥi/ | out\_pluie.svg |
| out\_23 | roche | rock | 巨石/石头 | /ʁɔʃ/ | out\_roche.svg |
| out\_24 | roue | wheel | 车轮 | /ʁu/ | out\_roue.svg |
| out\_25 | rue | street | 街道 | /ʁy/ | out\_rue.svg |
| out\_26 | sable | sand | 沙子 | /sabl/ | out\_sable.svg |
| out\_27 | soleil | sun | 太阳 | /sɔ.lɛj/ | out\_soleil.svg |
| out\_28 | toit | roof | 屋顶 | /twa/ | out\_toit.svg |
| out\_29 | tondeuse | lawnmower | 割草机 | /tɔ̃.døz/ | out\_tondeuse.svg |
| out\_30 | trottoir | sidewalk | 人行道 | /tʁɔ.twaʁ/ | out\_trottoir.svg |
| out\_31 | tuyau/boyau | garden hose | 水管 | /tɥi.jo/ | out\_tuyau.svg |
| out\_32 | vent | wind | 风 | /vɑ̃/ | out\_vent.svg |
| out\_33 | véranda/balcon | porch/balcony | 阳台/走廊 | /ve.ʁɑ̃.da/ | out\_veranda.svg |

## **11\. ENDROITS OÙ ALLER (19)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| pla\_01 | campagne | countryside | 乡村 | /kɑ̃.paɲ/ | pla\_campagne.svg |
| pla\_02 | camping | camping | 露营地 | /kam.piŋ/ | pla\_camping.svg |
| pla\_03 | chez-nous | home | 我们家 | /ʃe.nu/ | pla\_cheznous.svg |
| pla\_04 | cirque | circus | 马戏团 | /siʁk/ | pla\_cirque.svg |
| pla\_05 | dehors | outside | 室外/外面 | /də.ɔʁ/ | pla\_dehors.svg |
| pla\_06 | école | school | 学校 | /e.kɔl/ | pla\_ecole.svg |
| pla\_07 | église | church | 教堂 | /e.ɡliz/ | pla\_eglise.svg |
| pla\_08 | ferme | farm | 农场 | /fɛʁm/ | pla\_ferme.svg |
| pla\_09 | fête | party | 派对 | /fɛt/ | pla\_fete.svg |
| pla\_10 | forêt | forest | 森林 | /fɔ.ʁɛ/ | pla\_foret.svg |
| pla\_11 | garage-essence | gas station | 加油站 | /ɡa.ʁaʒ.ɛ.sɑ̃s/ | pla\_essence.svg |
| pla\_12 | magasin | store | 商店 | /ma.ɡa.zɛ̃/ | pla\_magasin.svg |
| pla\_13 | maison | house | 房子 | /mɛ.zɔ̃/ | pla\_maison.svg |
| pla\_14 | parc | park | 公园 | /paʁk/ | pla\_parc.svg |
| pla\_15 | pique-nique | picnic | 野餐 | /pik.nik/ | pla\_piquenique.svg |
| pla\_16 | plage | beach | 海滩 | /plaʒ/ | pla\_plage.svg |
| pla\_17 | terrain de jeu | playground | 游乐场 | /tɛ.ʁɛ̃.də.ʒø/ | pla\_terrain\_jeu.svg |
| pla\_18 | travail/bureau | work/office | 上班处/办公室 | /tʁa.vaj/ | pla\_travail.svg |
| pla\_19 | zoo | zoo | 动物园 | /zu/ | pla\_zoo.svg |

## **12\. GENS (29)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| peo\_01 | ami | friend | 朋友 | /a.mi/ | peo\_ami.svg |
| peo\_02 | bébé | baby | 婴儿/宝宝 | /be.be/ | peo\_bebe.svg |
| peo\_03 | bonhomme | man/figure | 男人/家伙 | /bɔ.nɔm/ | peo\_bonhomme.svg |
| peo\_04 | clown | clown | 小丑 | /klun/ | peo\_clown.svg |
| peo\_05 | cow-boy | cowboy | 牛仔 | /ko.bɔj/ | peo\_cowboy.svg |
| peo\_06 | docteur | doctor | 医生 | /dɔk.tœʁ/ | peo\_docteur.svg |
| peo\_07 | enfant | child | 孩子 | /ɑ̃.fɑ̃/ | peo\_enfant.svg |
| peo\_08 | facteur | mailman | 邮递员 | /fak.tœʁ/ | peo\_facteur.svg |
| peo\_09 | fille | girl | 女孩 | /fij/ | peo\_fille.svg |
| peo\_10 | frère | brother | 兄弟 | /fʁɛʁ/ | peo\_frere.svg |
| peo\_11 | garçon | boy | 男孩 | /ɡaʁ.sɔ̃/ | peo\_garcon.svg |
| peo\_12 | gardienne | babysitter/daycare educator | 保姆/幼儿园阿姨 | /ɡaʁ.djɛn/ | peo\_gardienne.svg |
| peo\_13 | gens/monde | people | 人群/大家 | /ʒɑ̃/ | peo\_gens.svg |
| peo\_14 | grand-maman | grandma | 奶奶/外婆 | /ɡʁɑ̃.ma.mɑ̃/ | peo\_grandmaman.svg |
| peo\_15 | grand-papa | grandpa | 爷爷/外公 | /ɡʁɑ̃.pa.pa/ | peo\_grandpapa.svg |
| peo\_16 | madame | lady/Mrs | 女士/阿姨 | /ma.dam/ | peo\_madame.svg |
| peo\_17 | maman | mom | 妈妈 | /ma.mɑ̃/ | peo\_maman.svg |
| peo\_18 | monsieur | gentleman/Mr | 先生/叔叔 | /mə.sjø/ | peo\_monsieur.svg |
| peo\_19 | nom de l'animal domestique | pet's name | 宠物名字 | /nɔ̃/ | peo\_pet\_name.svg |
| peo\_20 | nom du gardien(ne) | educator's name | 老师名字 | /nɔ̃/ | peo\_educator\_name.svg |
| peo\_21 | oncle/mononcle | uncle | 叔叔/舅舅 | /mɔ̃.nɔ̃kl/ | peo\_oncle.svg |
| peo\_22 | papa | dad | 爸爸 | /pa.pa/ | peo\_papa.svg |
| peo\_23 | personne | person | 人 | /pɛʁ.sɔn/ | peo\_personne.svg |
| peo\_24 | police | police officer | 警察 | /pɔ.lis/ | peo\_police.svg |
| peo\_25 | pompier | firefighter | 消防员 | /pɔ̃.pje/ | peo\_pompier.svg |
| peo\_26 | professeur(e) | teacher | 老师 | /pʁɔ.fɛ.sœʁ/ | peo\_professeur.svg |
| peo\_27 | soeur | sister | 姐妹 | /sœʁ/ | peo\_soeur.svg |
| peo\_28 | son propre nom | child's own name | 宝宝自己的名字 | /nɔ̃/ | peo\_child\_name.svg |
| peo\_29 | tante/matante | aunt | 姑姑/阿姨 | /ma.tɑ̃t/ | peo\_tante.svg |

## **13\. JEUX ET ROUTINES (30)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| rou\_01 | aller au magasin | go to store | 去超市/商店 | /a.le.o.ma.ɡa.zɛ̃/ | rou\_magasin.svg |
| rou\_02 | allô | hello on phone | 喂/你好 | /a.lo/ | rou\_allo.svg |
| rou\_03 | bain | bath | 洗澡 | /bɛ̃/ | rou\_bain.svg |
| rou\_04 | bonjour | hello | 你好 | /bɔ̃.ʒuʁ/ | rou\_bonjour.svg |
| rou\_05 | bonne nuit | good night | 晚安 | /bɔn.nɥi/ | rou\_bonnenuit.svg |
| rou\_06 | bravo\! | bravo\! | 太棒了\! | /bʁa.vo/ | rou\_bravo.svg |
| rou\_07 | bye / au revoir | bye | 再见 | /baj/ | rou\_bye.svg |
| rou\_08 | chut | shh | 嘘 | /ʃyt/ | rou\_chut.svg |
| rou\_09 | collation | snack time | 点心时间 | /kɔ.la.sjɔ̃/ | rou\_collation.svg |
| rou\_10 | coucou | peek-a-boo | 躲猫猫/咕咕 | /ku.ku/ | rou\_coucou.svg |
| rou\_11 | déjeuner | breakfast | 早餐 | /de.ʒœ.ne/ | rou\_dejeuner.svg |
| rou\_12 | dîner | lunch | 午餐 | /di.ne/ | rou\_diner.svg |
| rou\_13 | dodo | sleep | 睡觉觉 | /do.do/ | rou\_dodo.svg |
| rou\_14 | donne moi cinq / tape dedans | high five | 击掌 | /dɔn.mwa.sɛ̃k/ | rou\_highfive.svg |
| rou\_15 | faire caca / faire pipi | poop/pee | 拉粑粑/尿尿 | /fɛʁ.ka.ka/ | rou\_pipi\_caca.svg |
| rou\_16 | faire le tour de la maison | walk around house | 绕房子走一圈 | /fɛʁ.lə.tuʁ/ | rou\_tour\_maison.svg |
| rou\_17 | gros comme ça\! | this big\! | 这么大\! | /ɡʁo.kɔm.sa/ | rou\_gros\_comme\_sa.svg |
| rou\_18 | je te tiens par la barbichette | chin-tickle nursery rhyme | 抓胡须儿歌游戏 | /baʁ.bi.ʃɛt/ | rou\_barbichette.svg |
| rou\_19 | j'vais t'attraper | I'm gonna catch you | 我要抓到你啦 | /ʒvɛ.ta.tʁa.pe/ | rou\_attraper.svg |
| rou\_20 | menouche menouche | tickling game | 挠痒痒游戏 | /mə.nuʃ/ | rou\_menouche.svg |
| rou\_21 | merci | thank you | 谢谢 | /mɛʁ.si/ | rou\_merci.svg |
| rou\_22 | non | no | 不/不要 | /nɔ̃/ | rou\_non.svg |
| rou\_23 | o.k. | ok | 好 | /o.kɛ/ | rou\_ok.svg |
| rou\_24 | oui | yes | 是/好的 | /wi/ | rou\_oui.svg |
| rou\_25 | parler au téléphone | talk on phone | 打电话 | /paʁ.le.o.te.le.fɔn/ | rou\_parler\_tel.svg |
| rou\_26 | retourne-toi | turn around | 转过身来 | /ʁə.tuʁn.twa/ | rou\_retournetoi.svg |
| rou\_27 | s'il-vous-plaît | please | 请 | /sil.vu.plɛ/ | rou\_silvousplait.svg |
| rou\_28 | souper | dinner | 晚餐 | /su.pe/ | rou\_souper.svg |
| rou\_29 | tape tape | pat-a-cake/clap | 拍拍手 | /tap.tap/ | rou\_tapetape.svg |

## **14\. VERBES (103)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| vrb\_001 | acheter | buy | 买 | /aʃ.te/ | vrb\_acheter.svg |
| vrb\_002 | aider | help | 帮 | /e.de/ | vrb\_aider.svg |
| vrb\_003 | aimer | love/like | 喜欢 | /e.me/ | vrb\_aimer.svg |
| vrb\_004 | aller | go | 去 | /a.le/ | vrb\_aller.svg |
| vrb\_005 | allumer | turn on | 开灯/打开 | /a.ly.me/ | vrb\_allumer.svg |
| vrb\_006 | amener | bring along | 带来 | /am.ne/ | vrb\_amener.svg |
| vrb\_007 | applaudir | clap | 鼓掌 | /a.plo.diʁ/ | vrb\_applaudir.svg |
| vrb\_008 | apporter | bring | 拿来 | /a.pɔʁ.te/ | vrb\_apporter.svg |
| vrb\_009 | arrêter | stop | 停下 | /a.ʁɛ.te/ | vrb\_arreter.svg |
| vrb\_010 | arroser | water | 浇水 | /a.ʁɔ.ze/ | vrb\_arroser.svg |
| vrb\_011 | asseoir | sit | 坐下 | /a.swaʁ/ | vrb\_asseoir.svg |
| vrb\_012 | attacher | tie/buckle | 系上/系安全带 | /a.ta.ʃe/ | vrb\_attacher.svg |
| vrb\_013 | attendre | wait | 等待 | /a.tɑ̃dʁ/ | vrb\_attendre.svg |
| vrb\_014 | attraper | catch | 抓住 | /a.tʁa.pe/ | vrb\_attraper.svg |
| vrb\_015 | avoir | have | 有 | /a.vwaʁ/ | vrb\_avoir.svg |
| vrb\_016 | balancer | swing | 荡秋千/摇晃 | /ba.lɑ̃.se/ | vrb\_balancer.svg |
| vrb\_017 | balayer | sweep | 扫地 | /ba.lɛ.je/ | vrb\_balayer.svg |
| vrb\_018 | bercer | rock | 摇晃哄睡 | /bɛʁ.se/ | vrb\_bercer.svg |
| vrb\_019 | boire | drink | 喝 | /bwaʁ/ | vrb\_boire.svg |
| vrb\_020 | brasser | stir/shake | 搅拌/晃动 | /bʁa.se/ | vrb\_brasser.svg |
| vrb\_021 | briser/casser | break | 弄碎/打破 | /bʁi.ze/ | vrb\_briser.svg |
| vrb\_022 | brosser | brush | 刷牙/刷毛 | /bʁɔ.se/ | vrb\_brosser.svg |
| vrb\_023 | cacher | hide | 藏起来 | /ka.ʃe/ | vrb\_cacher.svg |
| vrb\_024 | chanter | sing | 唱歌 | /ʃɑ̃.te/ | vrb\_chanter.svg |
| vrb\_025 | chatouiller | tickle | 挠痒痒 | /ʃa.tu.je/ | vrb\_chatouiller.svg |
| vrb\_026 | chercher | search | 寻找 | /ʃɛʁ.ʃe/ | vrb\_chercher.svg |
| vrb\_027 | choisir | choose | 选择 | /ʃwa.ziʁ/ | vrb\_choisir.svg |
| vrb\_028 | cogner à | knock at | 敲门/碰撞 | /kɔ.ɲe/ | vrb\_cogner.svg |
| vrb\_029 | coller | stick/glue | 粘贴 | /kɔ.le/ | vrb\_coller.svg |
| vrb\_030 | conduire | drive | 开车 | /kɔ̃.dɥiʁ/ | vrb\_conduire.svg |
| vrb\_031 | construire/bâtir | build | 搭建/盖房子 | /kɔ̃s.tʁɥiʁ/ | vrb\_construire.svg |
| vrb\_032 | couper | cut | 剪/切 | /ku.pe/ | vrb\_couper.svg |
| vrb\_033 | courir | run | 跑 | /ku.ʁiʁ/ | vrb\_courir.svg |
| vrb\_034 | couvrir | cover | 盖上 | /ku.vʁiʁ/ | vrb\_couvrir.svg |
| vrb\_035 | cracher | spit | 吐口水 | /kʁa.ʃe/ | vrb\_cracher.svg |
| vrb\_036 | danser | dance | 跳舞 | /dɑ̃.se/ | vrb\_danser.svg |
| vrb\_037 | débarquer | get off | 下车/卸下 | /de.baʁ.ke/ | vrb\_debarquer.svg |
| vrb\_038 | déchirer | tear | 撕破 | /de.ʃi.ʁe/ | vrb\_dechirer.svg |
| vrb\_039 | descendre | go down | 下来/下楼 | /de.sɑ̃dʁ/ | vrb\_descendre.svg |
| vrb\_040 | dessiner | draw | 画画 | /de.si.ne/ | vrb\_dessiner.svg |
| vrb\_041 | dire | say | 说 | /diʁ/ | vrb\_dire.svg |
| vrb\_042 | donner | give | 给 | /dɔ.ne/ | vrb\_donner.svg |
| vrb\_043 | dormir | sleep | 睡觉 | /dɔʁ.miʁ/ | vrb\_dormir.svg |
| vrb\_044 | échapper | drop/escape | 掉落/没拿住 | /e.ʃa.pe/ | vrb\_echapper.svg |
| vrb\_045 | écouter | listen | 听 | /e.ku.te/ | vrb\_ecouter.svg |
| vrb\_046 | écrire | write | 写字 | /e.kʁiʁ/ | vrb\_ecrire.svg |
| vrb\_047 | embarquer | get in/on | 上车/登机 | /ɑ̃.baʁ.ke/ | vrb\_embarquer.svg |
| vrb\_048 | embrasser | kiss | 亲亲 | /ɑ̃.bʁa.se/ | vrb\_embrasser.svg |
| vrb\_049 | enlever | take off/remove | 脱掉/拿开 | /ɑ̃l.ve/ | vrb\_enlever.svg |
| vrb\_050 | entendre | hear | 听见 | /ɑ̃.tɑ̃dʁ/ | vrb\_entendre.svg |
| vrb\_051 | essayer | try | 尝试 | /e.sɛ.je/ | vrb\_essayer.svg |
| vrb\_052 | essuyer | wipe | 擦拭 | /e.sɥi.je/ | vrb\_essuyer.svg |
| vrb\_053 | être | be | 是 | /ɛtʁ/ | vrb\_etre.svg |
| vrb\_054 | faire | make/do | 做 | /fɛʁ/ | vrb\_faire.svg |
| vrb\_055 | fermer | close | 关上 | /fɛʁ.me/ | vrb\_fermer.svg |
| vrb\_056 | finir | finish | 做完 | /fi.niʁ/ | vrb\_finir.svg |
| vrb\_057 | glisser | slide | 滑滑梯/滑倒 | /ɡli.se/ | vrb\_glisser.svg |
| vrb\_058 | goûter | taste | 尝一尝 | /ɡu.te/ | vrb\_gouter.svg |
| vrb\_059 | grimper | climb | 攀爬 | /ɡʁɛ̃.pe/ | vrb\_grimper.svg |
| vrb\_060 | jeter | throw away | 扔掉 | /ʒə.te/ | vrb\_jeter.svg |
| vrb\_061 | jouer | play | 玩 | /ʒwe/ | vrb\_jouer.svg |
| vrb\_062 | lancer | throw | 扔球 | /lɑ̃.se/ | vrb\_lancer.svg |
| vrb\_063 | laver | wash | 洗 | /la.ve/ | vrb\_laver.svg |
| vrb\_064 | lécher | lick | 舔 | /le.ʃe/ | vrb\_lecher.svg |
| vrb\_065 | lire | read | 读/看书 | /liʁ/ | vrb\_lire.svg |
| vrb\_066 | manger | eat | 吃 | /mɑ̃.ʒe/ | vrb\_manger.svg |
| vrb\_067 | marcher | walk | 走路 | /maʁ.ʃe/ | vrb\_marcher.svg |
| vrb\_068 | mettre | put on/place | 穿上/放置 | /mɛtʁ/ | vrb\_mettre.svg |
| vrb\_069 | monter | climb up | 爬上去/上楼 | /mɔ̃.te/ | vrb\_monter.svg |
| vrb\_070 | montrer | show/point | 指给看 | /mɔ̃.tʁe/ | vrb\_montrer.svg |
| vrb\_071 | mordre | bite | 咬 | /mɔʁdʁ/ | vrb\_mordre.svg |
| vrb\_072 | nager | swim | 游泳 | /na.ʒe/ | vrb\_nager.svg |
| vrb\_073 | nettoyer | clean | 打扫 | /nɛ.twa.je/ | vrb\_nettoyer.svg |
| vrb\_074 | ouvrir | open | 打开 | /u.vʁiʁ/ | vrb\_ouvrir.svg |
| vrb\_075 | parler | talk | 说话 | /paʁ.le/ | vrb\_parler.svg |
| vrb\_076 | partager | share | 分享 | /paʁ.ta.ʒe/ | vrb\_partager.svg |
| vrb\_077 | patiner | skate | 滑冰 | /pa.ti.ne/ | vrb\_patiner.svg |
| vrb\_078 | peinturer | paint | 刷油漆/涂色 | /pɛ̃.ty.ʁe/ | vrb\_peinturer.svg |
| vrb\_079 | penser | think | 思考/想 | /pɑ̃.se/ | vrb\_penser.svg |
| vrb\_080 | pleurer | cry | 哭 | /plœ.ʁe/ | vrb\_pleurer.svg |
| vrb\_081 | pousser | push | 推 | /pu.se/ | vrb\_pousser.svg |
| vrb\_082 | pouvoir | can/be able | 能 | /pu.vwaʁ/ | vrb\_pouvoir.svg |
| vrb\_083 | prendre | take | 拿取 | /pʁɑ̃dʁ/ | vrb\_prendre.svg |
| vrb\_084 | ramasser | pick up | 捡起来 | /ʁa.ma.se/ | vrb\_ramasser.svg |
| vrb\_085 | ranger | tidy up | 收拾整理 | /ʁɑ̃.ʒe/ | vrb\_ranger.svg |
| vrb\_086 | regarder | look | 看 | /ʁə.ɡaʁ.de/ | vrb\_regarder.svg |
| vrb\_087 | renverser | spill/knock over | 弄倒/洒出 | /ʁɑ̃.vɛʁ.se/ | vrb\_renverser.svg |
| vrb\_088 | réparer | repair | 修理 | /ʁe.pa.ʁe/ | vrb\_reparer.svg |
| vrb\_089 | rester | stay | 留下 | /ʁɛs.te/ | vrb\_rester.svg |
| vrb\_090 | réveiller | wake up | 醒来 | /ʁe.vɛ.je/ | vrb\_reveiller.svg |
| vrb\_091 | sauter | jump | 跳 | /so.te/ | vrb\_sauter.svg |
| vrb\_092 | sécher | dry | 弄干 | /se.ʃe/ | vrb\_secher.svg |
| vrb\_093 | se dépêcher | hurry up | 快点/赶快 | /sə.de.pɛ.ʃe/ | vrb\_depecher.svg |
| vrb\_094 | souffler | blow | 吹气 | /su.fle/ | vrb\_souffler.svg |
| vrb\_095 | sourire | smile | 微笑 | /su.ʁiʁ/ | vrb\_sourire.svg |
| vrb\_096 | surveiller | watch over | 照看/看着 | /syʁ.vɛ.je/ | vrb\_surveiller.svg |
| vrb\_097 | taper | hit/type | 敲打/轻拍 | /ta.pe/ | vrb\_taper.svg |
| vrb\_098 | tenir | hold | 握住 | /tə.niʁ/ | vrb\_tenir.svg |
| vrb\_099 | tirer | pull | 拉 | /ti.ʁe/ | vrb\_tirer.svg |
| vrb\_100 | tomber | fall | 跌倒/摔倒 | /tɔ̃.be/ | vrb\_tomber.svg |
| vrb\_101 | toucher | touch | 摸 | /tu.ʃe/ | vrb\_toucher.svg |
| vrb\_102 | tourner | turn | 转圈 | /tuʁ.ne/ | vrb\_tourner.svg |
| vrb\_103 | transporter | carry/transport | 搬运 | /tʁɑ̃s.pɔʁ.te/ | vrb\_transporter.svg |
| vrb\_104 | travailler | work | 工作/干活 | /tʁa.va.je/ | vrb\_travailler.svg |
| vrb\_105 | trouver | find | 找到 | /tʁu.ve/ | vrb\_trouver.svg |
| vrb\_106 | venir | come | 过来 | /və.niʁ/ | vrb\_venir.svg |
| vrb\_107 | verser | pour | 倒水 | /vɛʁ.se/ | vrb\_verser.svg |
| vrb\_108 | voir | see | 看见 | /vwaʁ/ | vrb\_voir.svg |
| vrb\_109 | vouloir | want | 想要 | /vu.lwaʁ/ | vrb\_vouloir.svg |

## **15\. MOTS DESCRIPTIFS (60)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| des\_01 | avoir mal | hurt/in pain | 痛 | /a.vwaʁ.mal/ | des\_mal.svg |
| des\_02 | beau/belle | beautiful | 漂亮/帅气 | /bo/ /bɛl/ | des\_beau.svg |
| des\_03 | bien | good/well | 好 | /bjɛ̃/ | des\_bien.svg |
| des\_04 | blanc | white | 白色 | /blɑ̃/ | des\_blanc.svg |
| des\_05 | bleu | blue | 蓝色 | /blø/ | des\_bleu.svg |
| des\_06 | bon | good/tasty | 好/好吃 | /bɔ̃/ | des\_bon.svg |
| des\_07 | brisé/cassé | broken | 坏了/破了 | /bʁi.ze/ | des\_brise.svg |
| des\_08 | brun | brown | 棕色 | /bʁœ̃/ | des\_brun.svg |
| des\_09 | capable | capable | 会做/能做到 | /ka.pabl/ | des\_capable.svg |
| des\_10 | chaud | hot | 热/烫 | /ʃo/ | des\_chaud.svg |
| des\_11 | collant | sticky | 黏黏的 | /kɔ.lɑ̃/ | des\_collant.svg |
| des\_12 | content | happy | 开心 | /kɔ̃.tɑ̃/ | des\_content.svg |
| des\_13 | debout | standing | 站着 | /də.bu/ | des\_debout.svg |
| des\_14 | dégueulasse | yucky/gross | 恶心/难吃 | /de.ɡœ.las/ | des\_degueulasse.svg |
| des\_15 | dernier | last | 最后的 | /dɛʁ.nje/ | des\_dernier.svg |
| des\_16 | doux | soft | 软软的/温柔的 | /du/ | des\_doux.svg |
| des\_17 | dur | hard | 硬的 | /dyʁ/ | des\_dur.svg |
| des\_18 | endormi | asleep | 睡着的 | /ɑ̃.dɔʁ.mi/ | des\_endormi.svg |
| des\_19 | fâché | angry | 生气 | /fɑ.ʃe/ | des\_fache.svg |
| des\_20 | faim | hungry | 肚子饿 | /fɛ̃/ | des\_faim.svg |
| des\_21 | fatigué | tired | 累了 | /fa.ti.ɡe/ | des\_fatigue.svg |
| des\_22 | fini | finished | 结束了/完了 | /fi.ni/ | des\_fini.svg |
| des\_23 | fort | strong | 强壮/力气大 | /fɔʁ/ | des\_fort.svg |
| des\_24 | froid | cold | 凉/冷 | /fʁwa/ | des\_froid.svg |
| des\_25 | gentil | nice/kind | 乖/友好 | /ʒɑ̃.ti/ | des\_gentil.svg |
| des\_26 | gros/grand | big/tall | 大的/高的 | /ɡʁo/ /ɡʁɑ̃/ | des\_gros.svg |
| des\_27 | haut | high | 高的 | /o/ | des\_haut.svg |
| des\_28 | jaune | yellow | 黄色 | /ʒon/ | des\_jaune.svg |
| des\_29 | joli | pretty | 好看 | /ʒɔ.li/ | des\_joli.svg |
| des\_30 | long | long | 长 | /lɔ̃/ | des\_long.svg |
| des\_31 | lourd | heavy | 沉/重 | /luʁ/ | des\_lourd.svg |
| des\_32 | mal | bad/poorly | 不好 | /mal/ | des\_mal\_adv.svg |
| des\_33 | malade | sick | 生病 | /ma.lad/ | des\_malade.svg |
| des\_34 | mieux | better | 更好 | /mjø/ | des\_mieux.svg |
| des\_35 | mignon/cute | cute | 可爱 | /mi.ɲɔ̃/ | des\_mignon.svg |
| des\_36 | mouillé | wet | 湿的 | /mu.je/ | des\_mouille.svg |
| des\_37 | noir | black | 黑色 | /nwaʁ/ | des\_noir.svg |
| des\_38 | nouveau | new | 新的 | /nu.vo/ | des\_nouveau.svg |
| des\_39 | orange | orange color | 橙色 | /ɔ.ʁɑ̃ʒ/ | des\_orange.svg |
| des\_40 | parti | gone | 走了/不见了 | /paʁ.ti/ | des\_parti.svg |
| des\_41 | pauvre | poor | 可怜的 | /povʁ/ | des\_pauvre.svg |
| des\_42 | petit | small | 小的 | /pə.ti/ | des\_petit.svg |
| des\_43 | peur | scared | 害怕 | /pœʁ/ | des\_peur.svg |
| des\_44 | plein | full | 满的 | /plɛ̃/ | des\_plein.svg |
| des\_45 | premier | first | 第一 | /pʁə.mje/ | des\_premier.svg |
| des\_46 | pris | stuck/caught | 卡住了/被占用了 | /pʁi/ | des\_pris.svg |
| des\_47 | propre | clean | 干净 | /pʁɔpʁ/ | des\_propre.svg |
| des\_48 | réveillé | awake | 醒着的 | /ʁe.vɛ.je/ | des\_reveille.svg |
| des\_49 | rond | round | 圆的 | /ʁɔ̃/ | des\_rond.svg |
| des\_50 | rouge | red | 红色 | /ʁuʒ/ | des\_rouge.svg |
| des\_51 | sale | dirty | 脏的 | /sal/ | des\_sale.svg |
| des\_52 | sec | dry | 干的 | /sɛk/ | des\_sec.svg |
| des\_53 | soif | thirsty | 口渴 | /swaf/ | des\_soif.svg |
| des\_54 | tannant/méchant | naughty/mean | 调皮捣蛋/凶 | /ta.nɑ̃/ | des\_tannant.svg |
| des\_55 | tranquille | quiet/calm | 安静的 | /tʁɑ̃.kil/ | des\_tranquille.svg |
| des\_56 | triste/avoir peine | sad | 伤心 | /tʁist/ | des\_triste.svg |
| des\_57 | vert | green | 绿色 | /vɛʁ/ | des\_vert.svg |
| des\_58 | vide | empty | 空的 | /vid/ | des\_vide.svg |
| des\_59 | vieux | old | 老的/旧的 | /vjø/ | des\_vieux.svg |
| des\_60 | vite | fast | 快 | /vit/ | des\_vite.svg |

## **16\. MOTS POUR PARLER DU TEMPS (15)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| tim\_01 | après | after | 之后 | /a.pʁɛ/ | tim\_apres.svg |
| tim\_02 | aujourd'hui | today | 今天 | /o.ʒuʁ.dɥi/ | tim\_aujourdhui.svg |
| tim\_03 | avant | before | 之前 | /a.vɑ̃/ | tim\_avant.svg |
| tim\_04 | bientôt | soon | 马上/很快 | /bjɛ̃.to/ | tim\_bientot.svg |
| tim\_05 | ce soir | tonight | 今晚 | /sə.swaʁ/ | tim\_cesoir.svg |
| tim\_06 | demain | tomorrow | 明天 | /də.mɛ̃/ | tim\_demain.svg |
| tim\_07 | heure | hour/time | 点钟/时间 | /œʁ/ | tim\_heure.svg |
| tim\_08 | hier | yesterday | 昨天 | /jɛʁ/ | tim\_hier.svg |
| tim\_09 | jour | day | 白天 | /ʒuʁ/ | tim\_jour.svg |
| tim\_10 | maintenant | now | 现在 | /mɛ̃t.nɑ̃/ | tim\_maintenant.svg |
| tim\_11 | matin | morning | 早上 | /ma.tɛ̃/ | tim\_matin.svg |
| tim\_12 | nuit | night | 晚上 | /nɥi/ | tim\_nuit.svg |
| tim\_13 | plus tard | later | 之后/等会儿 | /ply.taʁ/ | tim\_plustard.svg |
| tim\_14 | tantôt | later/a while ago | 等下/刚才 | /tɑ̃.to/ | tim\_tantot.svg |
| tim\_15 | tout à l'heure | in a moment | 一会儿 | /tu.ta.lœʁ/ | tim\_toutaleure.svg |

## **17\. PRONOMS (27)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| pro\_01 | à eux | theirs | 他们的 | /a.ø/ | pro\_aeux.svg |
| pro\_02 | à lui | his | 他的 | /a.lɥi/ | pro\_alui.svg |
| pro\_03 | à moi | mine | 我的 | /a.mwa/ | pro\_amoi.svg |
| pro\_04 | à nous | ours | 我们的 | /a.nu/ | pro\_anous.svg |
| pro\_05 | à toi | yours | 你的 | /a.twa/ | pro\_atoi.svg |
| pro\_06 | à vous | yours | 你们的 | /a.vu/ | pro\_avous.svg |
| pro\_07 | ça | this/that | 这个 | /sa/ | pro\_ca.svg |
| pro\_08 | ce | this | 这 | /sə/ | pro\_ce.svg |
| pro\_09 | celui-là | that one | 那个 | /slɥi.la/ | pro\_celuila.svg |
| pro\_10 | elle | she | 她 | /ɛl/ | pro\_elle.svg |
| pro\_11 | elles | they f. | 她们 | /ɛl/ | pro\_elles.svg |
| pro\_12 | il | he/it | 他 | /il/ | pro\_il.svg |
| pro\_13 | ils | they m. | 他们 | /il/ | pro\_ils.svg |
| pro\_14 | je | I | 我 | /ʒə/ | pro\_je.svg |
| pro\_15 | le mien | mine | 我的那个 | /lə.mjɛ̃/ | pro\_lemien.svg |
| pro\_16 | le tien | yours | 你的那个 | /lə.tjɛ̃/ | pro\_letien.svg |
| pro\_17 | lui | him | 他 | /lɥi/ | pro\_lui.svg |
| pro\_18 | me | me | 我 | /mə/ | pro\_me.svg |
| pro\_19 | moi | me | 我 | /mwa/ | pro\_moi.svg |
| pro\_20 | mon | my | 我的 | /mɔ̃/ | pro\_mon.svg |
| pro\_21 | nous | we | 我们 | /nu/ | pro\_nous.svg |
| pro\_22 | nôtre/nos | our/ours | 我们的 | /notʁ/ | pro\_notre.svg |
| pro\_23 | on | we/one | 我们/大家 | /ɔ̃/ | pro\_on.svg |
| pro\_24 | son | his/her | 他的/她的 | /sɔ̃/ | pro\_son.svg |
| pro\_25 | toi | you | 你 | /twa/ | pro\_toi.svg |
| pro\_26 | ton | your | 你的 | /tɔ̃/ | pro\_ton.svg |
| pro\_27 | tu | you | 你 | /ty/ | pro\_tu.svg |
| pro\_28 | vous | you formal/pl. | 你们/您 | /vu/ | pro\_vous.svg |

## **18\. MOTS D'INTERROGATION (8)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| que\_01 | comment | how | 怎么 | /kɔ.mɑ̃/ | que\_comment.svg |
| que\_02 | lequel/laquelle | which one | 哪一个 | /lə.kɛl/ | que\_lequel.svg |
| que\_03 | où | where | 在哪里 | /u/ | que\_ou.svg |
| que\_04 | pourquoi | why | 为什么 | /puʁ.kwa/ | que\_pourquoi.svg |
| que\_05 | quand | when | 什么时候 | /kɑ̃/ | que\_quand.svg |
| que\_06 | quel | which/what | 哪个 | /kɛl/ | que\_quel.svg |
| que\_07 | qui | who | 谁 | /ki/ | que\_qui.svg |
| que\_08 | quoi | what | 什么 | /kwa/ | que\_quoi.svg |

## **19\. PRÉPOSITIONS ET TERMES LOCATIFS (25)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| pre\_01 | à/au | at/to | 在/去 | /a/ /o/ | pre\_a.svg |
| pre\_02 | à côté de | next to | 在旁边 | /a.ko.te.də/ | pre\_acotede.svg |
| pre\_03 | à terre / par terre | on the floor | 在地上 | /paʁ.tɛʁ/ | pre\_parterre.svg |
| pre\_04 | au-dessus | above | 在上方 | /o.də.sy/ | pre\_audessus.svg |
| pre\_05 | autour | around | 在周围 | /o.tuʁ/ | pre\_autour.svg |
| pre\_06 | avec | with | 和...一起 | /a.vɛk/ | pre\_avec.svg |
| pre\_07 | comme | like/as | 像...一样 | /kɔm/ | pre\_comme.svg |
| pre\_08 | dans | in/inside | 在里面 | /dɑ̃/ | pre\_dans.svg |
| pre\_09 | de | of/from | 从/的 | /də/ | pre\_de.svg |
| pre\_10 | de l'autre côté | on the other side | 在另一边 | /də.lotʁ.ko.te/ | pre\_delautrocote.svg |
| pre\_11 | devant/en avant | in front | 在前面 | /də.vɑ̃/ | pre\_devant.svg |
| pre\_12 | en | in | 在 | /ɑ̃/ | pre\_en.svg |
| pre\_13 | en arrière | behind | 在后面 | /ɑ̃.na.ʁjɛʁ/ | pre\_enarriere.svg |
| pre\_14 | en bas | downstairs/down | 在下面 | /ɑ̃.ba/ | pre\_enbas.svg |
| pre\_15 | en dehors de | outside of | 在外面 | /ɑ̃.də.ɔʁ.də/ | pre\_endehors.svg |
| pre\_16 | en haut | upstairs/up | 在上面 | /ɑ̃.o/ | pre\_enhaut.svg |
| pre\_17 | ici | here | 这里 | /i.si/ | pre\_ici.svg |
| pre\_18 | là/là-bas | there | 那里 | /la.ba/ | pre\_labas.svg |
| pre\_19 | loin | far | 远 | /lwɛ̃/ | pre\_loin.svg |
| pre\_20 | par | by/through | 从.../经过 | /paʁ/ | pre\_par.svg |
| pre\_21 | par-dessus | over | 越过上方 | /paʁ.də.sy/ | pre\_pardessus.svg |
| pre\_22 | pour | for | 为了/给 | /puʁ/ | pre\_pour.svg |
| pre\_23 | sous/en dessous | under | 在下面 | /su/ | pre\_sous.svg |
| pre\_24 | sur | on | 在上面 | /syʁ/ | pre\_sur.svg |
| pre\_25 | y (ex. 'on y va') | there/let's go | 去那里/走吧 | /i/ | pre\_y.svg |

## **20\. QUANTIFICATEURS ET ARTICLES (16)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| qua\_01 | autre | other | 另外的 | /otʁ/ | qua\_autre.svg |
| qua\_02 | beaucoup | a lot | 很多 | /bo.ku/ | qua\_beaucoup.svg |
| qua\_03 | de/du | some/of the | 一些 | /dy/ | qua\_du.svg |
| qua\_04 | des | plural indefinite | 一些 | /de/ | qua\_des.svg |
| qua\_05 | encore | more/again | 还要/再来 | /ɑ̃.kɔʁ/ | qua\_encore.svg |
| qua\_06 | le/la | the | 这个 | /lə/ /la/ | qua\_lela.svg |
| qua\_07 | même | same | 同样的 | /mɛm/ | qua\_meme.svg |
| qua\_08 | pareil | the same | 一模一样的 | /pa.ʁɛj/ | qua\_pareil.svg |
| qua\_09 | pas | not | 不 | /pa/ | qua\_pas.svg |
| qua\_10 | plus | more | 更多 | /ply/ | qua\_plus.svg |
| qua\_11 | plusieurs | several | 好几个 | /ply.zjœʁ/ | qua\_plusieurs.svg |
| qua\_12 | tout/toute | all/whole | 全部的 | /tu/ /tut/ | qua\_tout.svg |
| qua\_13 | trop | too much | 太...了/过多 | /tʁo/ | qua\_trop.svg |
| qua\_14 | un/une | a/an | 一个 | /œ̃/ /yn/ | qua\_unune.svg |
| qua\_15 | un autre | another one | 另一个 | /œ̃.notʁ/ | qua\_unautre.svg |
| qua\_16 | un peu | a little | 一点点 | /œ̃.pø/ | qua\_unpeu.svg |

## **21\. CONJONCTIONS (7)**

| ID | Français (Québec) | English | 中文 | Phonétique | Asset |
| :---- | :---- | :---- | :---- | :---- | :---- |
| cnj\_01 | alors | so/then | 那么 | /a.lɔʁ/ | cnj\_alors.svg |
| cnj\_02 | aussi | also | 也 | /o.si/ | cnj\_aussi.svg |
| cnj\_03 | et | and | 和 | /e/ | cnj\_et.svg |
| cnj\_04 | mais | but | 但是 | /mɛ/ | cnj\_mais.svg |
| cnj\_05 | parce que | because | 因为 | /paʁs.kə/ | cnj\_parceque.svg |
| cnj\_06 | puis | then | 然后 | /pɥi/ | cnj\_puis.svg |
| cnj\_07 | si | if | 如果 | /si/ | cnj\_si.svg |

---

# **4\. 语法与句子复杂度演进数据库 (Grammar Progression Database)**

## **Section C: Complexité des phrases (37 Structural Benchmark Pairs)**

| Pair ID | Level 1 (Telegraphic / Simple) | Level 2 (Expanded / Grammatical) | English Translation | Chinese Translation |
| :---- | :---- | :---- | :---- | :---- |
| syn\_01 | Auto papa | Auto à papa | Daddy's car | 爸爸的车 |
| syn\_02 | Toutou bébé | Toutou au bébé | Baby's teddy | 宝宝的毛绒小熊 |
| syn\_03 | Fille maison | Fille dans maison | Girl in the house | 女孩在房子里 |
| syn\_04 | Biscuit maman | Biscuit pour maman | Cookie for mom | 给妈妈的饼干 |
| syn\_05 | Chien table | Chien sur (la) table | Dog on the table | 狗在桌子上 |
| syn\_06 | Encore biscuit | Encore des biscuits | More cookies | 还要饼干 |
| syn\_07 | Donne pomme, maman | Donne une pomme, maman | Give an apple, mom | 妈妈给我一个苹果 |
| syn\_08 | Papa parti | Papa est parti | Daddy left | 爸爸走了 |
| syn\_09 | Pelle Pascal | Pascal a une pelle | Pascal has a shovel | 帕斯卡有一把铲子 |
| syn\_10 | Belle ta robe | Ta robe est belle | Your dress is pretty | 你的裙子真漂亮 |
| syn\_11 | Où maman? | Est où maman? | Where is mom? | 妈妈在哪里？ |
| syn\_12 | Mon camion | C'est mon camion | It's my truck | 这是我的卡车 |
| syn\_13 | Chat là | (Il) y a un chat | There is a cat | 那里有一只猫 |
| syn\_14 | Lancer balle | Lance (la) balle | Throw the ball | 扔球 |
| syn\_15 | Pas laver poupée | Lave pas poupée | Don't wash doll | 别洗娃娃 |
| syn\_16 | Encore jus | Veux d'autre jus | Want more juice | 还要果汁 |
| syn\_17 | Regarder télé | Veux regarder télé | Want to watch TV | 想看电视 |
| syn\_18 | Donner un bec | Veux donner un bec | Want to give a kiss | 想亲一下 |
| syn\_19 | Toi saute? | Peux-tu sauter? | Can you jump? | 你能跳吗？ |
| syn\_20 | Moi pas faire ça | Moi peux pas faire ça | I can't do that | 我不能做那个 |
| syn\_21 | Pipi dehors minou | Minou fait pipi dehors | Kitty pees outside | 小猫在外面尿尿 |
| syn\_22 | Pas marcher là | Faut pas marcher là | Mustn't walk there | 不能走那里 |
| syn\_23 | Moi livre | Le livre à moi | My book | 我的书 |
| syn\_24 | Mange une pomme | Je mange une pomme | I eat an apple | 我在吃苹果 |
| syn\_25 | La tête tombé | Il (est) tombé sur la tête | He fell on his head | 他摔到头了 |
| syn\_26 | Papa parti | Papa parti travailler | Daddy went to work | 爸爸去上班了 |
| syn\_27 | Regarde-moi | Regarde-moi danser | Watch me dance | 看我跳舞 |
| syn\_28 | Donne cuillère | Donne (la) cuillère pour manger | Give spoon to eat | 给勺子用来吃饭 |
| syn\_29 | Veux biscuits | Veux biscuits et/pis lait | Want cookies and milk | 想要饼干和牛奶 |
| syn\_30 | On a fait ça | Sophie et/pis moi a fait ça | Sophie and me did that | 索菲和我做了那个 |
| syn\_31 | Je chante une chanson | Je chante une chanson pour toi | I sing a song for you | 我为你唱一首歌 |
| syn\_32 | Pas lire le livre | Veux pas tu lis le livre | Don't want you to read book | 不想让你读这本书 |
| syn\_33 | C'est maman chante | C'est maman qui chante | It's mom who is singing | 是妈妈在唱歌 |
| syn\_34 | Je veux lui | Je veux lui que tu as | I want the one you have | 我想要你拿的那个 |
| syn\_35 | Regarde ça | Regarde ce que j'ai | Look what I have | 看我有什么 |
| syn\_36 | Bébé rit | Bébé rit parce que content | Baby laughs because happy | 宝宝笑是因为开心 |
| syn\_37 | Le chapeau de le monsieur | Le chapeau du monsieur | The gentleman's hat | 先生的帽子 |

## **Section D: Formes d'expression (11 Person/Pronoun Contrast Pairs)**

| Pair ID | Form A (Proper Name / Concrete) | Form B (Pronoun / Abstract) | English Translation | Chinese Translation |
| :---- | :---- | :---- | :---- | :---- |
| exp\_01 | Camion Simon | Mon camion | Simon's truck / My truck | 西蒙的卡车 vs 我的卡车 |
| exp\_02 | Simon sali | Moi sali | Simon got dirty / I got dirty | 西蒙弄脏了 vs 我弄脏了 |
| exp\_03 | Prends Simon | Prends-moi | Pick up Simon / Pick me up | 抱西蒙 vs 抱我 |
| exp\_04 | Simon jus | Veux jus | Simon wants juice / Want juice | 西蒙要果汁 vs 我要果汁 |
| exp\_05 | Maman belle | Toi belle | Mom is pretty / You are pretty | 妈妈真美 vs 你真美 |
| exp\_06 | Brosse dents maman | Brosse les dents | Brush mom's teeth / Brush teeth | 给妈妈刷牙 vs 刷牙 |
| exp\_07 | Le chat dort | Il dort | The cat sleeps / He is sleeping | 猫咪睡了 vs 他睡了 |
| exp\_08 | Ouvre la porte | Ouvre-la | Open the door / Open it | 开门 vs 打开它 |
| exp\_09 | La soupe est chaude | C'est chaud | The soup is hot / It's hot | 汤很热 vs 烫/热 |
| exp\_10 | Pas laver cheveux | Pas faire ça | Don't wash hair / Don't do that | 别洗头发 vs 别做那个 |
| exp\_11 | Jus dans tasse | Jus dedans | Juice in cup / Juice inside | 果汁在杯子里 vs 果汁在里面 |

---

# **5\. Web 交互游戏系统设计 (Interactive Game Engine Specifications)**

## **Stack Architecture**

* **Core Framework:** React 19 \+ TypeScript \+ Vite \+ TailwindCSS.  
* **Graphic Canvas / Animation:** Pixi.js v8 rendering canvas container managed by Framer Motion.  
* **Audio Layer:** Web Audio API with fallback sound buffers for low-latency playback (\< 50ms trigger).  
* **Icons:** Lucide Icons.

/src/engine/AudioContextManager.ts

class WebAudioManager {

  private ctx: AudioContext;

  private buffers: Map\<string, AudioBuffer\> \= new Map();

  constructor() {

    this.ctx \= new (window.AudioContext \|\| (window as any).webkitAudioContext)();

  }

  public async preloadAudio(id: string, url: string): Promise\<void\> {

    const res \= await fetch(url);

    const arrayBuffer \= await res.arrayBuffer();

    const decoded \= await this.ctx.decodeAudioData(arrayBuffer);

    this.buffers.set(id, decoded);

  }

  public playSound(id: string, pitchShift \= 1.0): void {

    if (this.ctx.state \=== 'suspended') {

      this.ctx.resume();

    }

    const buffer \= this.buffers.get(id);

    if (\!buffer) return;

    const source \= this.ctx.createBufferSource();

    source.buffer \= buffer;

    source.playbackRate.value \= pitchShift;

    source.connect(this.ctx.destination);

    source.start(0);

  }

}

export const audioManager \= new WebAudioManager();

## **Module 1: Scène Exploratoire**

* **Scene Types:** Interactive 2D vector environments (Living Room, Kitchen, Backyard, Park).  
* **Mechanic:** Toddlers tap on hidden interactive objects (e.g., *frigidaire*, *chat*, *balançoire*). On touch, the asset triggers a physics bounce (`Framer Motion: spring stiffness 400, damping 10`), plays its lexical sound item, and displays an animated visual highlight.

## **Module 2: Le Bâtisseur de Phrases**

* **Mechanic:** Visual drag-and-drop tile snapper.  
* **UI Structure:** Bottom panel displays 2–3 visual word chips (e.g., \[Image: Auto\] \+ \[Image: Papa\]).  
* **Interaction:** Tapping or dragging both blocks into the visual drop-zone combines them.  
  * *Level 1 Mode:* Triggers telegraphic prompt audio: *"Auto papa\!"*  
  * *Level 2 Mode:* Automatically inserts particle prepositions (\[à\]) and triggers grammatical audio: *"C'est l'auto à papa\!"*

## **Module 3: Simon a dit / Action-Réaction**

* **Mechanic:** Focuses on Body Parts and Verbs (*Touche le nez\!*, *Saute\!*).  
* **Interaction:** Character avatar performs actions or highlights body parts upon toddler selection. Immediate dynamic video-like micro-animations play upon success.

## **Parent Portal Gate & CDI Analytics**

* **Parental Access Lock:** Long-press action on top-right gear icon for **2.0 seconds** with radial progress indicator.

/src/components/ParentGate.tsx

import React, { useState, useRef } from 'react';

export const ParentGate: React.FC\<{ onSuccess: () \=\> void }\> \= ({ onSuccess }) \=\> {

  const \[holding, setHolding\] \= useState(false);

  const timerRef \= useRef\<NodeJS.Timeout \| null\>(null);

  const startHold \= () \=\> {

    setHolding(true);

    timerRef.current \= setTimeout(() \=\> {

      setHolding(false);

      onSuccess();

    }, 2000);

  };

  const endHold \= () \=\> {

    setHolding(false);

    if (timerRef.current) clearTimeout(timerRef.current);

  };

  return (

    \<button

      onMouseDown={startHold}

      onMouseUp={endHold}

      onTouchStart={startHold}

      onTouchEnd={endHold}

      className="relative w-16 h-16 rounded-full bg-slate-200 border-2 border-slate-400 flex items-center justify-center select-none"

    \>

      \<span className="text-xs font-bold text-slate-700"\>PARENTS\</span\>

      {holding && (

        \<div className="absolute inset-0 rounded-full border-4 border-indigo-500 animate-ping" /\>

      )}

    \</button\>

  );

};

* **Data Synchronization:** Real-time sync with `IndexedDB` / `localStorage`. Generates a progress summary mapping active usage against all 683 vocabulary items and 48 grammar patterns, with options to export as JSON or print as a standardized PDF assessment sheet.

---

# **6\. 自动化视频生成方案 (Video Automation Engine \- Remotion Specs)**

The automated video generator use  
es Remotion to programmatically compile and render micro-episodes (60–90 seconds) for distribution on YouTube Kids and other video platforms. The rendering engine consumes the shared vocabulary and grammar databases to dynamically synthesize speech, align audio stems, and generate multi-line subtitles.

---

# **7\. Project Directory Layout & Coding Agent Prompts**

## **Project Directory Structure**

french-toddler-platform/

├── package.json

├── vite.config.ts

├── remotion.config.ts

├── tsconfig.json

├── src/

│   ├── assets/

│   │   ├── audio/

│   │   └── illustrations/

│   ├── components/

│   │   ├── toddler/

│   │   │   ├── ExploratoryScene.tsx

│   │   │   ├── SoundBoxPeekaboo.tsx

│   │   │   ├── SentenceBuilder.tsx

│   │   │   └── SimonSays.tsx

│   │   ├── parent/

│   │   │   ├── ParentGate.tsx

│   │   │   ├── CdiDashboard.tsx

│   │   │   └── ExportReport.tsx

│   │   └── common/

│   ├── data/

│   │   ├── vocabulary.json

│   │   ├── grammarPairs.json

│   │   └── sentenceTemplates.json

│   ├── engine/

│   │   ├── AudioContextManager.ts

│   │   ├── ProgressTracker.ts

│   │   └── RenderCanvas.ts

│   └── remotion/

│       ├── Composition.tsx

│       ├── SubtitleOverlay.tsx

│       └── AudioStemSync.tsx

└── render-script.ts

## **Coding Agent Prompt Examples**

* **Prompt 1: Audio Manager Setup**

"Create a WebAudioManager class using the Web Audio API in TypeScript. It should support preloading audio files into decoded AudioBuffers, low-latency playback with pitch shifting, and state resume upon user interaction. Ensure full offline support with fallback handling."

* **Prompt 2: Toddler Sentence Builder**

"Implement a React 19 drag-and-drop SentenceBuilder component using Framer Motion. The component should take visual tiles from vocabulary.json, allow snapping into drop-zones, and trigger dynamic speech synthesis or audio playback based on Level 1 (telegraphic) or Level 2 (grammatical) mode."
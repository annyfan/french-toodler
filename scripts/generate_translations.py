import json
import re

# Mapping for 109 verbs
# Each item has:
# A: (en_pred, zh_pred, optional en_3s)
# B: (en_pred, zh_pred, optional en_3s)

VERB_TRANSLATIONS = {
    "vrb_001": {
        "A": ("buy a ball", "买一个球"),
        "B": ("buy an apple", "买一个苹果"),
    },
    "vrb_002": {
        "A": ("help mommy", "帮妈妈"),
        "B": ("help daddy", "帮爸爸"),
    },
    "vrb_003": {
        "A": ("like chocolate", "喜欢巧克力"),
        "B": ("like strawberries", "喜欢草莓"),
    },
    "vrb_004": {
        "A": ("go to daycare", "去托儿所"),
        "B": ("go to the park", "去公园"),
    },
    "vrb_005": {
        "A": ("turn on the light", "开灯"),
        "B": ("turn on the lamp", "开台灯"),
    },
    "vrb_006": {
        "A": ("bring along a toy", "带一个玩具来"),
        "B": ("bring along my bag", "带我的包来"),
    },
    "vrb_007": {
        "A": ("clap my hands", "拍拍手"),
        "B": ("clap for the show", "为表演鼓掌"),
    },
    "vrb_008": {
        "A": ("bring a book", "拿一本书来"),
        "B": ("bring a box", "拿一个盒子来"),
    },
    "vrb_009": {
        "A": ("stop the game", "停下游戏"),
        "B": ("stop the music", "停下音乐"),
    },
    "vrb_010": {
        "A": ("water the flowers", "给花浇水"),
        "B": ("water the plants", "给植物浇水"),
    },
    "vrb_011": {
        "A": ("sit my doll on a chair", "让洋娃娃坐在椅子上"),
        "B": ("sit my baby on the mat", "让小宝宝坐在地毯上"),
    },
    "vrb_012": {
        "A": ("tie my shoes", "系鞋带"),
        "B": ("fasten my coat", "系好外套"),
    },
    "vrb_013": {
        "A": ("wait for the bus", "等公交车"),
        "B": ("wait for my turn", "等我轮流"),
    },
    "vrb_014": {
        "A": ("catch the ball", "接住球"),
        "B": ("catch a small ball", "接住一个小球"),
    },
    "vrb_015": {
        "A": ("have a ball", "有一个球", "has a ball"),
        "B": ("have a doll", "有一个洋娃娃", "has a doll"),
    },
    "vrb_016": {
        "A": ("swing the doll", "摇晃洋娃娃"),
        "B": ("swing the baby", "摇晃小宝宝"),
    },
    "vrb_017": {
        "A": ("sweep the floor", "扫地"),
        "B": ("sweep the kitchen", "打扫厨房"),
    },
    "vrb_018": {
        "A": ("rock the baby", "哄小宝宝睡觉"),
        "B": ("rock my doll", "哄洋娃娃睡觉"),
    },
    "vrb_019": {
        "A": ("drink water", "喝水"),
        "B": ("drink milk", "喝牛奶"),
    },
    "vrb_020": {
        "A": ("stir the soup", "搅一搅汤"),
        "B": ("stir the juice", "搅一搅果汁"),
    },
    "vrb_021": {
        "A": ("break a toy", "弄坏了一个玩具"),
        "B": ("break a cup", "打破了一个杯子"),
    },
    "vrb_022": {
        "A": ("brush my teeth", "刷牙"),
        "B": ("brush my hair", "梳头发"),
    },
    "vrb_023": {
        "A": ("hide the treasure", "把宝藏藏起来"),
        "B": ("hide a toy", "把玩具藏起来"),
    },
    "vrb_024": {
        "A": ("sing a song", "唱一首歌"),
        "B": ("sing a nursery rhyme", "唱一首童谣"),
    },
    "vrb_025": {
        "A": ("tickle the baby", "给小宝宝挠痒痒"),
        "B": ("tickle daddy", "给爸爸挠痒痒"),
    },
    "vrb_026": {
        "A": ("look for my blankie", "找我的安抚巾"),
        "B": ("look for my shoes", "找我的鞋子"),
    },
    "vrb_027": {
        "A": ("choose a book", "选一本书"),
        "B": ("choose a ball", "选一个球"),
    },
    "vrb_028": {
        "A": ("knock on the door", "敲门"),
        "B": ("knock on the window", "敲窗户"),
    },
    "vrb_029": {
        "A": ("glue a picture", "贴一张图片"),
        "B": ("stick a star", "贴一颗星星"),
    },
    "vrb_030": {
        "A": ("drive the car", "开汽车"),
        "B": ("ride a bicycle", "骑自行车"),
    },
    "vrb_031": {
        "A": ("build a tower", "搭一座积木塔"),
        "B": ("build a castle", "盖一座城堡"),
    },
    "vrb_032": {
        "A": ("cut paper", "剪纸"),
        "B": ("cut an apple", "切苹果"),
    },
    "vrb_033": {
        "A": ("run in the park", "在公园里跑"),
        "B": ("run towards mommy", "跑向妈妈"),
    },
    "vrb_034": {
        "A": ("cover the baby", "给小宝宝盖被子"),
        "B": ("cover my blankie", "给小玩偶盖被子"),
    },
    "vrb_035": {
        "A": ("spit in the sink", "吐在水槽里"),
        "B": ("spit in a tissue", "吐在纸巾里"),
    },
    "vrb_036": {
        "A": ("dance with mommy", "和妈妈跳舞"),
        "B": ("dance with daddy", "和爸爸跳舞"),
    },
    "vrb_037": {
        "A": ("get off the boat", "从船上下来"),
        "B": ("get off the train", "从火车上下来"),
    },
    "vrb_038": {
        "A": ("tear a sheet of paper", "撕一张纸"),
        "B": ("tear paper", "撕纸"),
    },
    "vrb_039": {
        "A": ("go down the stairs", "下楼梯"),
        "B": ("go down the slide", "从滑梯上滑下来"),
    },
    "vrb_040": {
        "A": ("draw a cat", "画一只猫"),
        "B": ("draw a house", "画一座房子"),
    },
    "vrb_041": {
        "A": ("say hello", "说你好"),
        "B": ("say thank you", "说谢谢"),
    },
    "vrb_042": {
        "A": ("give a gift", "送一份礼物"),
        "B": ("give a flower", "送一朵花"),
    },
    "vrb_043": {
        "A": ("sleep in my bed", "在我的床上睡觉"),
        "B": ("sleep on the couch", "在沙发上睡觉"),
    },
    "vrb_044": {
        "A": ("drop my toy", "把玩具掉了"),
        "B": ("drop my crayon", "把蜡笔掉了"),
    },
    "vrb_045": {
        "A": ("listen to music", "听音乐"),
        "B": ("listen to a story", "听故事"),
    },
    "vrb_046": {
        "A": ("write my name", "写我的名字"),
        "B": ("write a letter", "写一封信"),
    },
    "vrb_047": {
        "A": ("get on the bus", "上公交车"),
        "B": ("get in the car", "上汽车"),
    },
    "vrb_048": {
        "A": ("kiss mommy", "亲亲妈妈"),
        "B": ("kiss daddy", "亲亲爸爸"),
    },
    "vrb_049": {
        "A": ("take off my coat", "脱掉外套"),
        "B": ("take off my boots", "脱掉靴子"),
    },
    "vrb_050": {
        "A": ("hear a sound", "听到一个声音"),
        "B": ("hear the bell", "听到钟声"),
    },
    "vrb_051": {
        "A": ("try on a hat", "试戴一顶帽子"),
        "B": ("try another game", "试玩另一个游戏"),
    },
    "vrb_052": {
        "A": ("wipe my hands", "擦擦手"),
        "B": ("wipe the table", "擦桌子"),
    },
    "vrb_053": {
        "A": ("am a nice child", "是个乖孩子", "is a nice child"),
        "B": ("am a good friend", "是个好朋友", "is a good friend"),
    },
    "vrb_054": {
        "A": ("make a drawing", "画一幅画"),
        "B": ("make a card", "做一张卡片"),
    },
    "vrb_055": {
        "A": ("close the door", "关上门"),
        "B": ("close the window", "关上窗户"),
    },
    "vrb_056": {
        "A": ("finish my meal", "吃完饭"),
        "B": ("finish my drawing", "画完画"),
    },
    "vrb_057": {
        "A": ("slide on the rug", "在地毯上滑行"),
        "B": ("slide on the slide", "在滑梯上滑下来"),
    },
    "vrb_058": {
        "A": ("taste the soup", "尝尝汤"),
        "B": ("taste cheese", "尝尝奶酪"),
    },
    "vrb_059": {
        "A": ("climb on the play set", "爬上游乐设施"),
        "B": ("climb on the bed", "爬到床上"),
    },
    "vrb_060": {
        "A": ("throw the ball", "扔球"),
        "B": ("throw an apple", "扔苹果"),
    },
    "vrb_061": {
        "A": ("play with daddy", "和爸爸一起玩"),
        "B": ("play with mommy", "和妈妈一起玩"),
    },
    "vrb_062": {
        "A": ("throw the ball", "扔球"),
        "B": ("throw a small ball", "扔一个小球"),
    },
    "vrb_063": {
        "A": ("wash my hands", "洗手"),
        "B": ("wash my face", "洗脸"),
    },
    "vrb_064": {
        "A": ("lick an ice cream", "舔冰淇淋"),
        "B": ("lick a lollipop", "舔棒棒糖"),
    },
    "vrb_065": {
        "A": ("read a book", "看书"),
        "B": ("read a story", "读故事"),
    },
    "vrb_066": {
        "A": ("eat an apple", "吃苹果"),
        "B": ("eat a banana", "吃香蕉"),
    },
    "vrb_067": {
        "A": ("walk in the park", "在公园里散步"),
        "B": ("walk on the sidewalk", "在人行道上走"),
    },
    "vrb_068": {
        "A": ("put on my coat", "穿上外套"),
        "B": ("put on my boots", "穿上靴子"),
    },
    "vrb_069": {
        "A": ("climb onto the chair", "爬上椅子"),
        "B": ("climb onto the bed", "爬上床"),
    },
    "vrb_070": {
        "A": ("show my drawing", "展示我的画"),
        "B": ("show my toy", "展示我的玩具"),
    },
    "vrb_071": {
        "A": ("bite an apple", "咬一口苹果"),
        "B": ("bite a carrot", "咬一口胡萝卜"),
    },
    "vrb_072": {
        "A": ("swim in the pool", "在泳池里游泳"),
        "B": ("swim in the lake", "在湖里游泳"),
    },
    "vrb_073": {
        "A": ("clean the table", "把桌子擦干净"),
        "B": ("clean the floor", "把地板擦干净"),
    },
    "vrb_074": {
        "A": ("open the box", "打开盒子"),
        "B": ("open my bag", "打开我的包"),
    },
    "vrb_075": {
        "A": ("talk with mommy", "和妈妈说话"),
        "B": ("talk with daddy", "和爸爸说话"),
    },
    "vrb_076": {
        "A": ("share my snack", "分享我的点心"),
        "B": ("share my cookie", "分享我的饼干"),
    },
    "vrb_077": {
        "A": ("skate on the ice", "在冰上滑冰"),
        "B": ("skate on the rink", "在溜冰场滑冰"),
    },
    "vrb_078": {
        "A": ("paint the wall", "粉刷墙壁"),
        "B": ("paint a house", "给房子涂色"),
    },
    "vrb_079": {
        "A": ("think of mommy", "想妈妈"),
        "B": ("think of daddy", "想爸爸"),
    },
    "vrb_080": {
        "A": ("cry for my toy", "因为玩具哭"),
        "B": ("cry for my cookie", "因为饼干哭"),
    },
    "vrb_081": {
        "A": ("push the stroller", "推小推车"),
        "B": ("push my sister", "推我姐姐"),
    },
    "vrb_082": {
        "A": ("can carry my bag", "能背起我的包", "can carry my bag"),
        "B": ("can open the box", "能打开盒子", "can open the box"),
    },
    "vrb_083": {
        "A": ("take my toy", "拿我的玩具"),
        "B": ("take a ball", "拿一个球"),
    },
    "vrb_084": {
        "A": ("pick up a pencil", "捡起一支铅笔"),
        "B": ("pick up a spoon", "捡起一把勺子"),
    },
    "vrb_085": {
        "A": ("put away my blocks", "收拾积木"),
        "B": ("put away my toys", "收拾玩具"),
    },
    "vrb_086": {
        "A": ("watch a cartoon", "看动画片"),
        "B": ("look at a photo", "看照片"),
    },
    "vrb_087": {
        "A": ("spill a glass of water", "打翻了一杯水"),
        "B": ("knock over a bowl", "打翻了一个碗"),
    },
    "vrb_088": {
        "A": ("fix my bike", "修好我的自行车"),
        "B": ("fix my toy", "修好我的玩具"),
    },
    "vrb_089": {
        "A": ("stay at home", "呆在家里"),
        "B": ("stay at my house", "留在家里"),
    },
    "vrb_090": {
        "A": ("wake up the baby", "叫醒小宝宝"),
        "B": ("wake up mommy", "叫醒妈妈"),
    },
    "vrb_091": {
        "A": ("jump on the trampoline", "在蹦床上跳"),
        "B": ("jump in the yard", "在院子里跳"),
    },
    "vrb_092": {
        "A": ("dry my hair", "吹干头发"),
        "B": ("dry my clothes", "晾干衣服"),
    },
    "vrb_093": {
        "A": ("hurry up to leave", "赶着出发"),
        "B": ("hurry up to go play", "赶着去玩"),
    },
    "vrb_094": {
        "A": ("blow on a candle", "吹蜡烛"),
        "B": ("blow on the soup", "吹吹热汤"),
    },
    "vrb_095": {
        "A": ("smile at mommy", "对妈妈笑"),
        "B": ("smile at daddy", "对爸爸笑"),
    },
    "vrb_096": {
        "A": ("watch over the baby", "照看小宝宝"),
        "B": ("watch over the children", "照看小朋友们"),
    },
    "vrb_097": {
        "A": ("tap on the drum", "敲敲小鼓"),
        "B": ("tap on the table", "敲敲桌子"),
    },
    "vrb_098": {
        "A": ("hold mommy's hand", "拉着妈妈的手"),
        "B": ("hold my blankie", "拿着我的小玩偶"),
    },
    "vrb_099": {
        "A": ("pull the rope", "拉绳子"),
        "B": ("pull a ribbon", "拉丝带"),
    },
    "vrb_100": {
        "A": ("fall on the ground", "摔倒在地上"),
        "B": ("fall in the garden", "跌倒在花园里"),
    },
    "vrb_101": {
        "A": ("touch the cat", "摸摸小猫"),
        "B": ("touch the ball", "摸摸球"),
    },
    "vrb_102": {
        "A": ("turn the steering wheel", "转动方向盘"),
        "B": ("turn a page", "翻过一页纸"),
    },
    "vrb_103": {
        "A": ("carry a bag", "搬运一个包"),
        "B": ("carry a wheel", "搬运一个轮子"),
    },
    "vrb_104": {
        "A": ("work at daycare", "在幼儿园做手工"),
        "B": ("work at home", "在家里忙碌"),
    },
    "vrb_105": {
        "A": ("find a treasure", "找到一个宝藏"),
        "B": ("find things at home", "在家里找到东西"),
    },
    "vrb_106": {
        "A": ("come to grandma's", "来外婆家"),
        "B": ("come to grandpa's", "来外公家"),
    },
    "vrb_107": {
        "A": ("pour water", "倒水"),
        "B": ("pour drinks at grandpa's", "在外公家倒饮料"),
    },
    "vrb_108": {
        "A": ("see a bird", "看见一只小鸟"),
        "B": ("see milk", "看见牛奶"),
    },
    "vrb_109": {
        "A": ("want a cookie", "想要一块饼干"),
        "B": ("want an ice cream", "想要一个冰淇淋"),
    },
}

# Mapping for 60 descriptors
DESCRIPTOR_TRANSLATIONS = {
    "des_01": {
        "A": ("have a tummy ache", "肚子疼", "has a tummy ache"),
        "B": ("have a headache", "头疼", "has a headache"),
    },
    "des_02": {
        "A": ("see a beautiful butterfly", "看到一只漂亮的蝴蝶"),
        "B": ("see a pretty flower", "看到一朵漂亮的花"),
    },
    "des_03": {
        "A": ("see a good drawing", "看到一幅很棒的画"),
        "B": ("see a good story", "看到一个好听的故事"),
    },
    "des_04": {
        "A": ("see a white cat", "看到一只白猫"),
        "B": ("see a white flower", "看到一朵白花"),
    },
    "des_05": {
        "A": ("see a blue ball", "看到一个蓝色的球"),
        "B": ("see a blue car", "看到一辆蓝色的车"),
    },
    "des_06": {
        "A": ("see a delicious cake", "看到一个美味的蛋糕"),
        "B": ("see a tasty apple", "看到一个好吃的苹果"),
    },
    "des_07": {
        "A": ("see a broken toy", "看到一个坏了的玩具"),
        "B": ("see a broken cup", "看到一个碎了的杯子"),
    },
    "des_08": {
        "A": ("see a brown bear", "看到一只棕熊"),
        "B": ("see a brown leaf", "看到一片棕色的树叶"),
    },
    "des_09": {
        "A": ("am able to jump", "能跳起来", "is able to jump"),
        "B": ("am able to run", "能跑起来", "is able to run"),
    },
    "des_10": {
        "A": ("see hot chocolate", "看到热巧克力"),
        "B": ("see hot soup", "看到热汤"),
    },
    "des_11": {
        "A": ("see a sticky sticker", "看到一张黏黏的贴纸"),
        "B": ("see sticky dough", "看到黏黏的面团"),
    },
    "des_12": {
        "A": ("am happy to play", "玩得很开心", "is happy to play"),
        "B": ("am happy to see you", "见到你很高兴", "is happy to see you"),
    },
    "des_13": {
        "A": ("am standing near the table", "站在桌子旁边", "is standing near the table"),
        "B": ("am standing in front of the door", "站在门前面", "is standing in front of the door"),
    },
    "des_14": {
        "A": ("see a dirty tissue", "看到一张脏兮兮的纸巾"),
        "B": ("see a smelly sock", "看到一只臭袜子"),
    },
    "des_15": {
        "A": ("see the last cookie", "看到最后一块饼干"),
        "B": ("see the last apple", "看到最后一个苹果"),
    },
    "des_16": {
        "A": ("see a soft blankie", "看到一个软绵绵的安抚玩偶"),
        "B": ("see a soft blanket", "看到一条柔软的毯子"),
    },
    "des_17": {
        "A": ("see a hard block", "看到一块硬邦邦的积木"),
        "B": ("see a hard stone", "看到一块坚硬的石头"),
    },
    "des_18": {
        "A": ("am asleep in bed", "在床上睡着了", "is asleep in bed"),
        "B": ("am asleep on the couch", "在沙发上睡着了", "is asleep on the couch"),
    },
    "des_19": {
        "A": ("am upset about the noise", "对吵闹声很生气", "is upset about the noise"),
        "B": ("am upset after the dispute", "吵架后很生气", "is upset after the dispute"),
    },
    "des_20": {
        "A": ("am hungry after playing", "玩耍后肚子饿了", "is hungry after playing"),
        "B": ("am hungry this morning", "今天早上肚子饿了", "is hungry this morning"),
    },
    "des_21": {
        "A": ("am tired after playing", "玩完后好累", "is tired after playing"),
        "B": ("am tired tonight", "今晚好累", "is tired tonight"),
    },
    "des_22": {
        "A": ("see a finished drawing", "看到一幅画好的画"),
        "B": ("see a finished build", "看到一个搭好的积木"),
    },
    "des_23": {
        "A": ("see a strong wind", "看到一阵大风"),
        "B": ("hear a loud voice", "听到响亮的声音"),
    },
    "des_24": {
        "A": ("see cold juice", "看到冰凉的果汁"),
        "B": ("see cold water", "看到冷水"),
    },
    "des_25": {
        "A": ("see a gentle dog", "看到一只温顺的小狗"),
        "B": ("see a sweet kitty", "看到一只温柔的小猫"),
    },
    "des_26": {
        "A": ("see a big ball", "看到一个大球"),
        "B": ("see a big house", "看到一座大房子"),
    },
    "des_27": {
        "A": ("see a tall wall", "看到一面高高的墙"),
        "B": ("see a tall tower", "看到一座高高的塔"),
    },
    "des_28": {
        "A": ("see a yellow duck", "看到一只黄色的小鸭"),
        "B": ("see a yellow flower", "看到一朵黄色的花"),
    },
    "des_29": {
        "A": ("see a pretty drawing", "看到一幅漂亮的画"),
        "B": ("see a pretty dress", "看到一条漂亮的裙子"),
    },
    "des_30": {
        "A": ("see a long train", "看到一列长长的火车"),
        "B": ("see a long rope", "看到一根长长的绳子"),
    },
    "des_31": {
        "A": ("see a heavy bag", "看到一个沉重的包"),
        "B": ("see a heavy box", "看到一个沉重的箱子"),
    },
    "des_32": {
        "A": ("have a hurt foot", "脚疼", "has a hurt foot"),
        "B": ("have a hurt arm", "胳膊疼", "has a hurt arm"),
    },
    "des_33": {
        "A": ("am sick today", "今天生病了", "is sick today"),
        "B": ("am sick this morning", "今天早晨生病了", "is sick this morning"),
    },
    "des_34": {
        "A": ("feel better this morning", "今天早晨感觉好多了"),
        "B": ("feel better today", "今天感觉好多了"),
    },
    "des_35": {
        "A": ("see a cute cat", "看到一只可爱的小猫"),
        "B": ("see a cute mouse", "看到一只可爱的小老鼠"),
    },
    "des_36": {
        "A": ("see a wet coat", "看到一件湿漉漉的外套"),
        "B": ("see a wet towel", "看到一条湿毛巾"),
    },
    "des_37": {
        "A": ("see a black cat", "看到一只黑猫"),
        "B": ("see a black car", "看到一辆黑色的汽车"),
    },
    "des_38": {
        "A": ("see a new toy", "看到一个新玩具"),
        "B": ("see a new doll", "看到一个新的洋娃娃"),
    },
    "des_39": {
        "A": ("see an orange ball", "看到一个橙色的球"),
        "B": ("see an orange car", "看到一辆橙色的车"),
    },
    "des_40": {
        "A": ("went to the park", "去公园了"),
        "B": ("went to daycare", "去托儿所了"),
    },
    "des_41": {
        "A": ("see a poor little dog", "看到一只可怜的小狗"),
        "B": ("see a poor little kitty", "看到一只可怜的小猫"),
    },
    "des_42": {
        "A": ("see a little cat", "看到一只小猫"),
        "B": ("see a tiny mouse", "看到一只小老鼠"),
    },
    "des_43": {
        "A": ("am afraid of the dark", "害怕黑暗", "is afraid of the dark"),
        "B": ("am afraid of thunder", "害怕打雷", "is afraid of thunder"),
    },
    "des_44": {
        "A": ("see a full glass", "看到满满的一杯水"),
        "B": ("see a full box", "看到满满的一盒子"),
    },
    "des_45": {
        "A": ("see the first drawing", "看到第一幅画"),
        "B": ("see the first page", "看到第一页"),
    },
    "des_46": {
        "A": ("see an occupied seat", "看到座位有人坐了"),
        "B": ("see a taken spot", "看到位置被占了"),
    },
    "des_47": {
        "A": ("see a clean sweater", "看到一件干净的毛衣"),
        "B": ("see a clean plate", "看到一个干净的盘子"),
    },
    "des_48": {
        "A": ("am awake this morning", "今早醒来了", "is awake this morning"),
        "B": ("am awake after naptime", "午睡后醒来了", "is awake after naptime"),
    },
    "des_49": {
        "A": ("see a round ball", "看到一个圆圆的球"),
        "B": ("see a round plate", "看到一个圆圆的盘子"),
    },
    "des_50": {
        "A": ("see a red ball", "看到一个红色的球"),
        "B": ("see a red car", "看到一辆红色的车"),
    },
    "des_51": {
        "A": ("see dirty pants", "看到脏兮兮的裤子"),
        "B": ("see a dirty plate", "看到一个脏盘子"),
    },
    "des_52": {
        "A": ("see dry cloth", "看到干爽的布"),
        "B": ("see a dry towel", "看到一条干爽的毛巾"),
    },
    "des_53": {
        "A": ("am thirsty after playing", "玩耍后口渴了", "is thirsty after playing"),
        "B": ("am thirsty this morning", "今天早晨口渴了", "is thirsty this morning"),
    },
    "des_54": {
        "A": ("see a mean character", "看到一个淘气的大反派"),
        "B": ("see a wicked witch", "看到一个凶凶的女巫"),
    },
    "des_55": {
        "A": ("am quiet in the bedroom", "在卧室里静悄悄的", "is quiet in the bedroom"),
        "B": ("am resting quietly on the couch", "在沙发上安静地休息", "is resting quietly on the couch"),
    },
    "des_56": {
        "A": ("am sad without mommy", "没有妈妈好难过", "is sad without mommy"),
        "B": ("am sad after saying goodbye", "分别后有些难过", "is sad after saying goodbye"),
    },
    "des_57": {
        "A": ("see a green crayon", "看到一根绿色的蜡笔"),
        "B": ("see a green apple", "看到一个青苹果"),
    },
    "des_58": {
        "A": ("see an empty glass", "看到一个空的玻璃杯"),
        "B": ("see an empty box", "看到一个空盒子"),
    },
    "des_59": {
        "A": ("see an old book", "看到一本老旧的书"),
        "B": ("see an old doll", "看到一个旧洋娃娃"),
    },
    "des_60": {
        "A": ("run fast towards mommy", "快快地跑向妈妈"),
        "B": ("run fast towards daddy", "快快地跑向爸爸"),
    },
}

def make_3s(pred):
    words = pred.split(' ')
    first = words[0]
    rest = ' '.join(words[1:]) if len(words) > 1 else ''
    
    if first == 'am':
        s_form = 'is'
    elif first == 'have':
        s_form = 'has'
    elif first == 'feel':
        s_form = 'feels'
    elif first == 'can':
        s_form = 'can'
    elif first == 'went':
        s_form = 'went'
    elif first.endswith('ch') or first.endswith('sh') or first.endswith('s') or first.endswith('x') or first.endswith('z') or first.endswith('o'):
        s_form = first + 'es'
    elif first.endswith('y') and len(first) > 1 and first[-2] not in 'aeiou':
        s_form = first[:-1] + 'ies'
    else:
        s_form = first + 's'
        
    return f"{s_form} {rest}".strip()

def make_be_plural(pred):
    # for 'am', plural is 'are'
    if pred.startswith('am '):
        return 'are ' + pred[3:]
    return pred

PRONOUNS = ['je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles']

PRONOUN_MAP = {
    'je': ('I', '我'),
    'tu': ('You', '你'),
    'il': ('He', '他'),
    'elle': ('She', '她'),
    'nous': ('We', '我们'),
    'vous': ('You', '你们'),
    'ils': ('They', '他们'),
    'elles': ('They', '她们'),
}

def generate_sentence_translations(tuple_data):
    en_pred = tuple_data[0]
    zh_pred = tuple_data[1]
    en_3s = tuple_data[2] if len(tuple_data) > 2 else make_3s(en_pred)
    
    en_dict = {}
    zh_dict = {}
    
    for p in PRONOUNS:
        en_subj, zh_subj = PRONOUN_MAP[p]
        
        # English predicate based on pronoun
        if p in ['il', 'elle']:
            p_pred = en_3s
        elif p in ['nous', 'vous', 'ils', 'elles']:
            p_pred = make_be_plural(en_pred)
        else:
            p_pred = en_pred
            
        en_dict[p] = f"{en_subj} {p_pred}."
        zh_dict[p] = f"{zh_subj}{zh_pred}。"
        
    return {"en": en_dict, "zh": zh_dict}

# Process src/data/sentences.json
with open('src/data/sentences.json', 'r', encoding='utf-8') as f:
    exercises = json.load(f)

updated_count = 0
for ex in exercises:
    eid = ex['id']
    t_map = VERB_TRANSLATIONS if eid.startswith('vrb_') else DESCRIPTOR_TRANSLATIONS
    
    if eid in t_map:
        mapping = t_map[eid]
        ex['examples']['A']['translations'] = generate_sentence_translations(mapping['A'])
        ex['examples']['B']['translations'] = generate_sentence_translations(mapping['B'])
        updated_count += 1
    else:
        print(f"Warning: Missing translation for {eid}")

with open('src/data/sentences.json', 'w', encoding='utf-8') as f:
    json.dump(exercises, f, ensure_ascii=False, indent=2)

print(f"Successfully updated {updated_count}/{len(exercises)} exercises with EN and ZH translations!")

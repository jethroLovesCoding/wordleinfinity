var wordbank = ["ANGER","AVAIL","ANGLE","ANGRY","AGILE","ANGEL","APART","ALIGN","AMAZE","ADAPT","ADULT","AFTER","ABOVE","AHEAD","BULLY","BINGE","BRAIN","BIDET","BLAME","BENCH","BELLY","BRAVE","BLUNT","BIRTH","BLEND","BURNT","BLACK","BLADE","BLOOD","BRAKE","BLESS","BLOOM","BELOW","CRANE","CANDY","CHILD","CHASE","CURRY","CHAIN","CHECK","CREAM","CABLE","CRACK","COVER","CHEAP","CLEAN","DIRTY","DAIRY","DIARY","DIETY","DENSE","DAISY","DAILY","DIZZY","DRIVE","DREAM","DRAIN","DRINK","DIVER","EMPTY","ENTER","EAGER","EARTH","EIGHT","ERASE","ELITE","EAGLE","FEVER","FLOUR","FIELD","FLAME","FUNNY","FLICK","FROWN","FIGHT","FLOOR","FAIRY","FLOOD","GRIEF","GLASS","GIVER","GREAT","GRASS","GRAND","HELLO","HARSH","WEDGE","HUMAN","HASTE","HOVER","HEART","HEAVY","HAZEL","HOUSE","HEGDE","IMPLY","INDIA","IVORY","INNER","JAPAN","JEANS","JOINT","JELLY","JEWEL","JOKER","LEVEL","LIGHT","LAZER","LOVER","LUNGS","LIVER","LATER","LABLE","MIGHT","MAJOR","MOVIE","MAYOR","MONEY","MAPLE","MOUTH","NORTH","NIGHT","NYLON","NICHE","NEVER","NINJA","NEEDY","OLIVE","OASIS","OMLET","OTTER","ORDER","PLUTO","PEACH","PANTS","POWER","PERCH","PIZZA","PADDY","PLATE","PLUCK","PLANE","PLAIN","PIVOT","QUEUE","QUEEN","QUIET","RIVER","SPOON","REFER","RANGE","READY","RAZOR","RIGHT","SHAVE","SHAKE","SNAKE","SHADE","SHAPE","SIREN","SHAME","SILLY","SKILL","SPILL","SENSE","SABER","SEVEN","STAMP","STEAM","STING","SONGS","SOUTH","SOBER","STEEP","STICK","SHINE","SLIME","SWING","SEVER","SHOCK","SHIRT","SIGHT","TABLE","TOWER","TRAIN","THICK","TAKEN","TENSE","THREE","TITAN","THIEF","TIGER","TOKEN","UTTER","UNDER","UPPER","VAGUE","VINES","VIXEN","VISIT","VIRUS","VOCAL","VENUS","VERGE","WHACK","WHITE","WHALE","WORLD","WASTE","WAGER","WAGON","WHEAT","WRONG","WATER","WATCH","WITCH","XYLEM","YOUNG","YUMMY","YATCH","YIELD","YOUTH"];
var range = wordbank.length;
document.getElementById("word-count").innerText = "Word Count: "+range;
document.getElementById("wordle").innerText = "Wordle \u221e";
document.getElementById("close-btn").innerText = "\u00d7";
setTimeout(function(){
  document.getElementById("pop-up").classList.remove("hide");
}, 100);
var word = wordbank[randInt(0,range)];
var row = 0;
var grey = "#3a3a3c";
var green = "#548c4c";
var yellow = "#b59f3a";
var orange= "#e65c00";
var backspace = "B";

document.getElementById("reload-btn").addEventListener("click", function (){ document.location.reload() });
document.getElementById("help-btn").addEventListener("click", function (){
  document.getElementById("shadow").classList.remove("hide");
  setTimeout(function(){
    document.getElementById("shadow").style.opacity = 0.5;
  }, 10);
  document.getElementById("help-box").classList.remove("hide");
  setTimeout(function(){
    document.getElementById("help-box").style.opacity = 1;
  }, 10);
});
document.getElementById("close-btn").addEventListener("click", function (){
  document.getElementById("shadow").style.opacity = 0;
  setTimeout(function(){
    document.getElementById("shadow").classList.add("hide");
  }, 400);
  document.getElementById("help-box").style.opacity = 0;
  setTimeout(function(){
    document.getElementById("help-box").classList.add("hide")
  }, 400)
});

function randInt(min, max){
  let rand = Math.random()
  return min+Math.floor(rand*max)
}

function input(letter){
  for(let i=row; i<=row; i++){
    for(let j=0; j<5; j++){
      let box = document.getElementById("box"+i+j);
      if(box.innerText == ""){
        box.innerText = letter;
        box.style.backgroundColor = grey;
        i=6;
        break;
      }
    }
  }
}

function func(action){
  if(action == "B"){
    for(let i=row; i<=row; i++){
      for(let j=4; j>=0; j--){
        let box = document.getElementById("box"+i+j);
        if(box.innerText != ""){
          box.innerText = "";
          box.style.backgroundColor = "black";
          i=6;
          break;
        }
      }
    }
  }
  if(action == "E"){
    let userword = "";
    let popUp = document.getElementById("pop-up");
    for(let n=0; n<5; n++){
      userword += document.getElementById("box"+row+n).innerText;
    }
    if(userword.length == 5){
      if(userword == word){
        for(let n=0; n<5; n++){
          let box = document.getElementById("box"+row+n);
          box.style.backgroundColor = green;
          box.style.borderColor = green;
          document.getElementById("key"+box.innerText).style.backgroundColor = green;
        }
        popUp.innerText = "You found it!";
        backspace = "";
        popUp.style.opacity = 1;
        setTimeout(function() { popUp.style.opacity = 0;
        }, 3000);
      }
      else if(userword != word){
        let c = 0;
        for(let m=0; m<range; m++){
          if(userword == wordbank[m]){
            c++;
          }
        }
        if(row == 5 && c > 0){
          for(let n=0; n<5; n++){
            let box = document.getElementById("box"+row+n);
            box.style.backgroundColor = orange;
            box.style.borderColor = orange;
            document.getElementById("key"+box.innerText).style.backgroundColor = grey;
          }
          popUp.innerText = "The word was "+word+".";
          backspace = "";
          popUp.style.opacity = 1;
        }
        else if(c > 0){
          for(let m=0; m<5; m++){
            for(let n=0; n<5; n++){
              let box = document.getElementById("box"+row+n);
              if(word[m] == userword[n]){
                if(m == n){
                  box.style.backgroundColor = green;
                  box.style.borderColor = green;
                }else{
                  box.style.backgroundColor = yellow;
                  box.style.borderColor = yellow;
                }
              }else{
                document.getElementById("key"+userword[n]).style.backgroundColor = grey;
              }
            }
          }
          for(let m=0; m<5; m++){
            let box = document.getElementById("box"+row+m);
            document.getElementById("key"+box.innerText).style.backgroundColor = box.style.backgroundColor;
          }
          row++;
        }
        else if(c == 0){
          popUp.innerText = "Not in the word list.";
          popUp.style.opacity = 1;
          setTimeout(function() { popUp.style.opacity = 0;
          }, 3000);
        }
      }
    }
    else if(userword.length < 5){
      popUp.innerText = "Not enough letters.";
      popUp.style.opacity = 1;
      setTimeout(function() { popUp.style.opacity = 0;
      }, 3000);
    }
  }
}

var grid = document.getElementById("puzzle-cont");
for(let i=0; i<6; i++){
  for(let j=0; j<5; j++){
    let elm = document.createElement("span");
    elm.id = "box"+i+j;
    elm.className = "puzzle-box";
    grid.appendChild(elm);
  }
}

var keys = "QWERTYUIOPASDFGHJKL>ZXCVBNM<";
var keyboard = document.getElementById("key-cont");
for(let i=0; i<28; i++){
  let ltr = keys[i];
  let elm = document.createElement("button");
  elm.id = "key"+ltr;
  if(i == 27){
    elm.className = "key special-key";
    elm.innerText = "\u232B";
    elm.addEventListener("click",function() { func(backspace) });
  }
  else if(i == 19){
    elm.className = "key special-key";
    elm.style.fontSize = "10pt";
    elm.style.fontWeight = "bold";
    elm.style.width = "50px";
    elm.innerText = "ENTER";
    elm.addEventListener("click",function() { func("E") });
  }
  else{
    elm.className = "key";
    elm.innerText = ltr;
    elm.addEventListener("click",function() { input(ltr) });
  }
  keyboard.appendChild(elm);
}

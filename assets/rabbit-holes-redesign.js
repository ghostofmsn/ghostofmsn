(function(){
  const overlay=document.getElementById("links30");
  if(!overlay||overlay.dataset.rhxMounted)return;
  overlay.dataset.rhxMounted="1";
  overlay.classList.add("rhx-ready");

  const titleAsset="/assets/rabbit-holes-stitch-title.png";
  const sparkAsset="/assets/rabbit-holes-spark.png";
  const fallback=[
    ["ARCHIVE.PDF","https://www.archivepdf.net/scans","Rare fashion books, magazines and designer lookbooks.","Follow one designer across seasons.","fashion"],
    ["FRUiTS","https://archive.org/details/frui-ts-001/page/n23/mode/2up?view=theater","Shoichi Aoki's Harajuku street-style magazine.","Compare styling, layers and accessories.","fashion"],
    ["FILM PACKAGING ARCHIVE","https://fp-archive.com/","High-resolution film boxes and processing ephemera.","Compare typography across brands and decades.","photo"],
    ["INTERNET ARCHIVE: ZINES","https://archive.org/details/zines","Digitised DIY zines and small-press publications.","Search fashion, club, punk or Tokyo.","print"],
    ["firstVIEW","https://www.firstview.com/","Runway and backstage photography.","Pick a designer and inspect the construction.","fashion"],
    ["BUTKUS MANUALS","https://www.butkus.org/chinon/","Scanned camera, meter and flash manuals.","Find original diagrams and operating notes.","photo"]
  ];
  const raw=(window.SHELF_PUBLIC||fallback).map((entry,index)=>({
    id:"rhx-"+index,
    title:String(entry[0]||"Untitled"),url:String(entry[1]||"#"),description:String(entry[2]||""),prompt:String(entry[3]||""),category:String(entry[4]||"weird"),
  }));
  const pick=(needle,otherwise)=>raw.find(item=>item.title.toLowerCase().includes(needle))||fallback.map((entry,index)=>({id:"fallback-"+index,title:entry[0],url:entry[1],description:entry[2],prompt:entry[3],category:entry[4]}))[otherwise];
  const curated=[pick("archive.pdf",0),pick("fruits 001",1)||pick("fruits",1),pick("film packaging archive",2),pick("internet archive / zines",3)||pick("zines",3),pick("firstview",4),pick("butkus",5)].filter(Boolean);
  const byUrl=new Map([...raw,...curated].map(item=>[item.url,item]));
  const storageKey="gomsn-rabbit-pockets-v2";
  const readSaved=()=>{try{return JSON.parse(localStorage.getItem(storageKey)||"[]").filter(url=>byUrl.has(url));}catch(_){return[]}};
  let saved=readSaved(),filter="all",query="",rotation=0;
  const esc=value=>String(value||"").replace(/[&<>\"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'\"':"&quot;","'":"&#39;"}[char]));
  const host=url=>{try{return new URL(url).hostname.replace(/^www\./,"")}catch(_){return"archive"}};
  const thumb=item=>{
    const title=item.title.toLowerCase();
    if(title.includes("archive.pdf"))return "/assets/rabbit-cards/archive.png";
    if(title.includes("fruits"))return "/assets/rabbit-cards/fruits.png";
    if(title.includes("film packaging"))return "/assets/rabbit-cards/film-packaging.png";
    if(title.includes("zines"))return "/assets/rabbit-cards/zines.png";
    if(title.includes("firstview"))return "/assets/rabbit-cards/firstview.png";
    if(title.includes("butkus"))return "/assets/rabbit-cards/butkus.png";
    return ({fashion:"/assets/rabbit-cards/firstview.png",print:"/assets/rabbit-cards/zines.png",photo:"/assets/rabbit-cards/film-packaging.png",objects:"/assets/rabbit-cards/archive.png",music:"/assets/rabbit-cards/fruits.png",sound:"/assets/rabbit-cards/fruits.png"}[item.category]||"/assets/rabbit-cards/archive.png");
  };
  const categoryLabel={fashion:"fashion",print:"print",photo:"photo",objects:"objects",music:"sound",weird:"weird web",books:"print",film:"photo",space:"weird web",scent:"objects",beauty:"objects",jewellery:"objects"};
  const filters=[[
    "all","ALL"],["fashion","FASHION"],["print","PRINT"],["photo","PHOTO"],["objects","OBJECTS"],["sound","SOUND"],["weird","WEIRD WEB"]];

  overlay.innerHTML=`<div class="rhx-shell">
    <header class="rhx-nav"><button class="rhx-brand" type="button" data-rhx-room>the ghost of MSN</button><nav class="rhx-menu" aria-label="Rabbit Holes navigation"><button type="button" data-rhx-room>Room</button><button type="button" aria-current="page">Rabbit Holes</button><button type="button" data-rhx-blends>Blend Book</button><button type="button" data-rhx-world>My World</button></nav><button class="rhx-close" type="button" data-l30x>Close</button></header>
    <div class="rhx-steps" aria-label="How Rabbit Holes works"><span>01 SEARCH</span><span>02 OPEN</span><span>03 POCKET</span></div>
    <section class="rhx-hero" aria-label="Rabbit Holes"><p class="rhx-fig">fig. 01\n/ rabbit (?)\n/ keeps files</p><img class="rhx-title-art" src="${titleAsset}" alt="Rabbit Holes, stitched in burgundy thread with a stitched rabbit"><p class="rhx-pin-note">pin /<br>for later<br>(or forever)</p></section>
    <form class="rhx-search" role="search"><label class="sr-only" for="rhxQuery">Search Rabbit Holes</label><input id="rhxQuery" type="search" autocomplete="off" placeholder="search a thought, object, era or obsession…"><button type="submit">FALL IN</button></form>
    <nav class="rhx-filters" aria-label="Filter Rabbit Holes">${filters.map(([key,label])=>`<button type="button" data-rhx-filter="${key}" aria-pressed="${key==="all"}">${label}</button>`).join("")}</nav>
    <div class="rhx-layout"><main class="rhx-results" aria-live="polite"><div id="rhxCards"></div><footer class="rhx-fall"><button type="button" data-rhx-fall>KEEP FALLING ↓</button><span class="rhx-related">related searches: early web diaries / j-fashion scans / photocopy zines / camera manuals</span></footer></main><aside class="rhx-deck" aria-label="Research Deck"><h2 id="rhxDeckTitle">RESEARCH DECK · 00</h2><ul class="rhx-deck-list" id="rhxDeck"></ul><button class="rhx-deck-view" type="button" data-rhx-view-deck>VIEW DECK</button></aside></div>
    <button class="rhx-spark" type="button" data-rhx-spark aria-label="Spark a random rabbit hole"><img src="${sparkAsset}" alt=""></button><div class="rhx-toast" id="rhxToast" role="status"></div><div id="l30grid" hidden></div>
  </div>`;

  const cards=overlay.querySelector("#rhxCards"),deck=overlay.querySelector("#rhxDeck"),deckTitle=overlay.querySelector("#rhxDeckTitle"),searchInput=overlay.querySelector("#rhxQuery");
  const group=item=>categoryLabel[item.category]||"weird web";
  const matchesFilter=item=>filter==="all"||group(item)===filter;
  const current=()=>{
    const words=query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    let list=(words.length?raw:curated).filter(matchesFilter).filter(item=>!words.length||words.every(word=>(item.title+" "+item.description+" "+item.prompt+" "+item.category).toLowerCase().includes(word)));
    if(rotation&&list.length>1)list=list.slice(rotation%list.length).concat(list.slice(0,rotation%list.length));
    return list.slice(0,query?12:6);
  };
  const cardMarkup=(item,feature)=>`<article class="rhx-card ${feature?"rhx-feature":"rhx-small"}" data-rhx-card="${esc(item.url)}"><span class="rhx-thumb"><span>${esc(group(item))}</span><img src="${esc(thumb(item))}" alt="Preview of ${esc(item.title)}" loading="lazy" onerror="this.style.display='none'"></span><div class="rhx-copy"><h${feature?"2":"3"}>${esc(item.title.replace(" / scans","").replace(" 001",""))}</h${feature?"2":"3"}><p>${esc(item.description)}</p><div class="rhx-meta"><span>${esc(host(item.url))}</span><span>${esc(group(item))}</span></div></div><div class="rhx-actions"><a href="${esc(item.url)}" target="_blank" rel="noopener" data-rhx-open="${esc(item.url)}">OPEN ↗</a><button type="button" data-rhx-pocket="${esc(item.url)}" aria-pressed="${saved.includes(item.url)}">${saved.includes(item.url)?"POCKETED":"POCKET +"}</button></div></article>`;
  function paint(){
    const list=current();
    cards.innerHTML=list.length?cardMarkup(list[0],true)+`<div class="rhx-grid">${list.slice(1).map(item=>cardMarkup(item,false)).join("")}</div>`:`<div class="rhx-empty"><h2>Nothing in this tunnel yet.</h2><p>Try fewer words, another category, or let Spark choose badly for you.</p></div>`;
    overlay.querySelectorAll("[data-rhx-filter]").forEach(button=>button.setAttribute("aria-pressed",String(button.dataset.rhxFilter===filter)));
    paintDeck();
  }
  function paintDeck(){
    const items=saved.map(url=>byUrl.get(url)).filter(Boolean).slice(0,8);
    deckTitle.textContent=`RESEARCH DECK · ${String(items.length).padStart(2,"0")}`;
    deck.innerHTML=items.length?items.map(item=>`<li><img src="${esc(thumb(item))}" alt="" loading="lazy" onerror="this.style.visibility='hidden'"><a href="${esc(item.url)}" target="_blank" rel="noopener" title="${esc(item.title)}">${esc(item.title)}</a><button type="button" data-rhx-remove="${esc(item.url)}" aria-label="Remove ${esc(item.title)}">remove</button></li>`).join(""):`<li class="rhx-deck-empty">Pocket a source and it will wait here while you keep searching.</li>`;
  }
  function toast(message){const node=overlay.querySelector("#rhxToast");node.textContent=message;node.classList.add("on");clearTimeout(toast.timer);toast.timer=setTimeout(()=>node.classList.remove("on"),1800)}
  function remember(item){
    try{
      window.XS=window.XS||{};XS.learn=XS.learn||[];
      if(!XS.learn.some(entry=>entry&&entry.url===item.url))XS.learn.unshift({k:"source",t:item.title,line:item.description,url:item.url,at:Date.now()});
      if(typeof xsave==="function")xsave();
    }catch(_){}
  }
  function save(){localStorage.setItem(storageKey,JSON.stringify(saved));paint()}
  overlay.querySelector(".rhx-search").addEventListener("submit",event=>{event.preventDefault();query=searchInput.value.trim();rotation=0;paint();cards.scrollIntoView({behavior:"smooth",block:"start"})});
  overlay.addEventListener("click",event=>{
    const filterButton=event.target.closest("[data-rhx-filter]");
    if(filterButton){filter=filterButton.dataset.rhxFilter;rotation=0;paint();return}
    const pocketButton=event.target.closest("[data-rhx-pocket]");
    if(pocketButton){const url=pocketButton.dataset.rhxPocket,item=byUrl.get(url);saved=saved.includes(url)?saved.filter(value=>value!==url):[url,...saved.filter(value=>value!==url)];if(item&&saved.includes(url)){remember(item);toast(item.title+" pocketed") }else toast("Removed from the deck");save();return}
    const removeButton=event.target.closest("[data-rhx-remove]");
    if(removeButton){saved=saved.filter(value=>value!==removeButton.dataset.rhxRemove);save();toast("Removed from the deck");return}
    if(event.target.closest("[data-rhx-fall]")){rotation+=5;paint();cards.scrollIntoView({behavior:"smooth",block:"start"});return}
    if(event.target.closest("[data-rhx-spark]")){const list=current();if(!list.length)return;const item=list[Math.floor(Math.random()*list.length)],node=overlay.querySelector(`[data-rhx-card="${CSS.escape(item.url)}"]`);overlay.querySelectorAll(".sparked").forEach(card=>card.classList.remove("sparked"));if(node){node.classList.add("sparked");node.scrollIntoView({behavior:"smooth",block:"center"})}toast("Spark found "+item.title);return}
    if(event.target.closest("[data-rhx-view-deck]")){deck.closest(".rhx-deck").scrollIntoView({behavior:"smooth",block:"start"});toast(saved.length?`${saved.length} saved reference${saved.length===1?"":"s"}`:"Your deck is empty");return}
    if(event.target.closest("[data-rhx-open]")){const item=byUrl.get(event.target.closest("[data-rhx-open]").dataset.rhxOpen);if(item)remember(item)}
    if(event.target.closest("[data-rhx-room]")){overlay.classList.remove("open");try{goPlace("room")}catch(_){ }return}
    if(event.target.closest("[data-rhx-blends]")){overlay.classList.remove("open");document.querySelector('[data-open-blend="book"]')?.click();return}
    if(event.target.closest("[data-rhx-world]")){overlay.classList.remove("open");document.getElementById("worldLauncher")?.click();return}
  });
  paint();
})();

/* =================== EXTENSION 30: a real music room, rabbit holes, a back button, the museum holds the archive, a learning journal, the weird garden =================== */
(function(){
  const W = (u, w) => u.replace("/960px-", "/" + (w || 500) + "px-");
  const LIVE = typeof LIVEWEB !== "undefined" ? LIVEWEB : true;
  const enc = s => encodeURIComponent(s);
  try { const l = document.createElement("link"); l.rel = "stylesheet"; l.href = "https://fonts.googleapis.com/css2?family=Bagel+Fat+One&family=Rubik+Mono+One&display=swap"; document.head.appendChild(l); } catch(_) {}

  /* ---------------- the learning journal (everything logs here) ---------------- */
  XS.learn = XS.learn || [];
  const learn = (k, t, line) => { try { const last = XS.learn[0]; if (last && last.t === t && last.k === k && Date.now() - last.at < 6e4) return; XS.learn.unshift({k, t, line: line || "", at: Date.now()}); XS.learn = XS.learn.slice(0, 600); xsave(); } catch(_) {} };
  window.learn = learn;

  /* ---------------- photos (Wikimedia Commons, credited) ---------------- */
  const P = {
    shop: ["https://upload.wikimedia.org/wikipedia/commons/7/78/Bundesarchiv_B_145_Bild-F079073-0006%2C_Bonn%2C_Sternstra%C3%9Fe%2C_Schallplattengesch%C3%A4ft.jpg", "record shop, Bonn · Bundesarchiv, CC BY-SA 3.0 de"],
    akai: ["https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/AKAI_stack_%28cropped%29.jpg/960px-AKAI_stack_%28cropped%29.jpg", "Akai stack · Alexgroza, public domain"],
    tt: ["https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Technics_SL-1200MK2-2.jpg/960px-Technics_SL-1200MK2-2.jpg", "Technics SL-1200MK2 · CC BY-SA 2.5"],
    djm: ["https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Pioneer_DJM900_Nexus_DJ_Mixer_tweaked_%282015-04-25_by_Aur%C3%A9lien%29_pixabay.jpg/960px-Pioneer_DJM900_Nexus_DJ_Mixer_tweaked_%282015-04-25_by_Aur%C3%A9lien%29_pixabay.jpg", "Pioneer DJM-900 · Aurélien, CC0"],
    cd: ["https://thumb.wikimedia.org/wikipedia/commons/thumb/1/16/Laserpointer-CD.jpg/960px-Laserpointer-CD.jpg", "CD · Miessen, CC0"],
    nokia: ["https://thumb.wikimedia.org/wikipedia/commons/thumb/3/31/Nokia_3310_blue.jpg/960px-Nokia_3310_blue.jpg", "Nokia 3310 · Michael Brandtner, public domain"],
    walk: ["https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/Walkman_TPS-L2.jpg/960px-Walkman_TPS-L2.jpg", "Walkman TPS-L2 · Anna Gerdén, CC BY-SA 3.0"],
    phone: ["https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9c/746_telephone_in_red.JPG/960px-746_telephone_in_red.JPG", "746 telephone · Diamondmagna, CC BY-SA 3.0"],
    tr808: ["https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Roland_TR-808_Rhythm_Composer.jpg/960px-Roland_TR-808_Rhythm_Composer.jpg", "Roland TR-808 · fr4dd, CC BY 2.0"],
    reel: ["https://upload.wikimedia.org/wikipedia/commons/e/e0/Reel-to-reel_recorder_tc-630.jpg", "Sony TC-630 · Nixdorf, CC BY-SA 3.0"],
    head: ["https://thumb.wikimedia.org/wikipedia/commons/thumb/0/00/S%C5%82uchawki_referencyjne_K-701_firmy_AKG.jpg/960px-S%C5%82uchawki_referencyjne_K-701_firmy_AKG.jpg", "AKG K701 · muzyczny.pl, CC BY-SA 4.0"],
    k7: ["https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f0/Compactcassette.jpg/960px-Compactcassette.jpg", "compact cassette · Thegreenj, CC BY-SA 3.0"],
    boom: ["https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d8/Sharp_GF-9494_%2822W%29_Ghetto_Blaster_%28edited%29.jpg/960px-Sharp_GF-9494_%2822W%29_Ghetto_Blaster_%28edited%29.jpg", "Sharp GF-9494 · Stephen Michael Barnett, CC BY 2.0"],
    vinyl: ["https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Vinilos_distintos_tama%C3%B1os.jpg/960px-Vinilos_distintos_tama%C3%B1os.jpg", "records · Banfield, CC BY-SA 3.0"],
    disc: ["https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9d/Sony_Discman_D-145_face_20160921a.jpg/960px-Sony_Discman_D-145_face_20160921a.jpg", "Sony Discman D-145 · MiNe, CC BY 2.0"]
  };
  const COLS = ["#f2c230", "#e8432e", "#3aa0e0", "#f08ab4", "#58b368", "#f27a2a", "#9b7bd8", "#2fc4b2", "#e6e1d3"];
  const cut = (k, c, cls) => `<span class="cut ${cls || ""}" style="--c:${c}"><img src="${W(P[k][0], 500)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.classList.add('noimg')"></span>`;
  const STAR = `<svg viewBox="0 0 100 100"><path d="M50 4l12 32 34 2-27 21 10 33-29-19-29 19 10-33L4 38l34-2z" fill="#f6e43c" stroke="#1a1a1a" stroke-width="3" stroke-linejoin="round"/></svg>`;

  /* ---------------- 1. the music room, rebuilt as a photo collage ---------------- */
  const MR = $("#mroom");
  if (MR) {
    const st = MR.querySelector(".mrstage");
    st.classList.add("collage30");
    const objs = [
      ["dig", "shop", COLS[0], "the dig", "vinyl · cds · cassettes", "o-dig"],
      ["stereo", "akai", COLS[2], "the stereo", "tune into the world", "o-stereo"],
      ["garage", "tt", COLS[1], "the garage", "two decks, one fader", "o-tt"],
      ["garage", "djm", COLS[7], "", "", "o-djm"],
      ["wheel", "cd", COLS[3], "spin your sound", "and fall in", "o-cd"],
      ["ring", "nokia", COLS[4], "make a ringtone", "", "o-nokia"],
      ["channels", "walk", COLS[5], "your channels", "", "o-walk"],
      ["garage", "tr808", COLS[6], "", "", "o-808"],
      ["dig", "k7", COLS[8], "", "", "o-k7"],
      ["stereo", "boom", COLS[3], "", "", "o-boom"],
      ["channels", "head", COLS[0], "", "", "o-head"],
      ["ring", "phone", COLS[2], "", "", "o-phone"],
      ["garage", "reel", COLS[5], "", "", "o-reel"],
      ["dig", "disc", COLS[4], "", "", "o-disc"]
    ];
    st.insertAdjacentHTML("beforeend", `<div class="mr30">
      <div class="mr30title"><span>the</span><b>music room</b><svg class="mr30squig" viewBox="0 0 600 120" preserveAspectRatio="none"><path d="M10 70 C 40 10, 80 10, 100 60 S 160 110, 190 60 S 250 10, 280 60 S 340 110, 370 60 S 430 10, 460 60 S 520 110, 590 50" fill="none" stroke="#e3242b" stroke-width="3"/></svg></div>
      ${objs.map(([mr, k, c, l, s, cls], i) => `<button class="mro30 ${cls}" data-mr="${mr}" style="--r:${[-4, 3, -2, 5, -6, 4, -3, 6, -5, 2, -4, 5, -2, 3][i]}deg">${cut(k, c)}${l ? `<em>${esc(l)}${s ? `<small>${esc(s)}</small>` : ""}</em>` : ""}</button>`).join("")}
      ${[[8, 22], [44, 14], [70, 30], [90, 62], [30, 70], [58, 84], [16, 52]].map(([x, y], i) => `<i class="mr30star" style="left:${x}%;top:${y}%;--d:${i * .4}s">${STAR}</i>`).join("")}
      <svg class="mr30doodle" viewBox="0 0 1000 700" preserveAspectRatio="none">${Array.from({length: 22}, (_, i) => `<circle cx="${80 + (i * 137) % 860}" cy="${120 + (i * 211) % 480}" r="${18 + (i * 7) % 26}" fill="none" stroke="#e3242b" stroke-width="2.2"/>`).join("")}</svg>
      <div class="mr30cred">photos: ${Object.values(P).map(p => esc(p[1])).join(" · ")} — via Wikimedia Commons</div>
      ${LIVE ? "" : `<div class="mr30note">the photographs load on the live site (ghostofmsn.netlify.app). this preview blocks outside images.</div>`}
    </div>`);
  }

  /* ---------------- 2. rabbit holes: every genre, explained ---------------- */
  /* [where & when, what it is, listen for, artists, next holes] */
  const RH = {
    "shibuya-kei": ["Tokyo, early–mid 90s, around the record shops of Shibuya", "pop made by crate-diggers: bossa nova, French 60s pop, soundtracks and lounge, cut up and glued together like a scrapbook.", "too many references per minute, breathy vocals, bright brass, samples that wink at you", ["Pizzicato Five", "Flipper's Guitar", "Cornelius", "Kahimi Karie", "Fantastic Plastic Machine", "Takako Minekawa"], ["yé-yé", "bossa nova", "lounge", "city pop"]],
    "city pop": ["Japan, late 70s–80s, the bubble economy", "glossy pop, funk and soft rock made for driving through a rich city at night. ignored for decades, then rediscovered on YouTube in the 2010s.", "slap bass, Rhodes piano, brass stabs, very clean studio sound", ["Mariya Takeuchi", "Tatsuro Yamashita", "Taeko Ohnuki", "Anri", "Miki Matsubara", "Hiroshi Sato"], ["vaporwave", "shibuya-kei", "italo disco"]],
    "raï": ["Oran, Algeria. old Bedouin song, turned pop with synths in the 80s", "songs about love, drink and freedom that the authorities kept trying to silence. the cheikhas sang it first.", "darbuka, accordion or synth, long ornamented vocal lines, the word 'rayi' (my opinion)", ["Cheikha Rimitti", "Khaled", "Cheb Hasni", "Chaba Fadela", "Cheb Mami", "Rachid Taha"], ["sha'abi", "gnawa", "desert blues"]],
    "dabke": ["the Levant: Lebanon, Syria, Palestine, Jordan", "a line dance with a stomp (people once stamped mud roofs flat together). the wedding music behind it went electronic with Syrian singers and keyboards.", "the mijwiz (double-reed pipe), the tabl drum, the stomp on the off-beat, call and response", ["Omar Souleyman", "Wadih El Safi", "Fairuz", "Sabah", "47Soul"], ["mahraganat", "arabic jazz", "khaleeji"]],
    "ethio-jazz": ["Addis Ababa, the 'Swinging Addis' years of the late 60s–70s", "Ethiopian scales (the qenet modes) played with jazz and Latin rhythm. Mulatu Astatke built it; the Éthiopiques reissues brought it to the world.", "five-note minor modes, vibraphone, organ, horns that sound slightly unfamiliar", ["Mulatu Astatke", "Mahmoud Ahmed", "Hailu Mergia", "Alemayehu Eshete", "Getatchew Mekurya", "Tlahoun Gèssèssè"], ["spiritual jazz", "highlife", "free jazz"]],
    "tropicália": ["Brazil, 1967–68, under the military dictatorship", "artists who mixed bossa nova, psychedelic rock and avant-garde collage as a political act. Caetano Veloso and Gilberto Gil were jailed and sent into exile.", "fuzz guitar next to Brazilian percussion, orchestras, irony", ["Os Mutantes", "Caetano Veloso", "Gilberto Gil", "Gal Costa", "Tom Zé", "Jorge Ben"], ["bossa nova", "anatolian psych", "exotica"]],
    "trip-hop": ["Bristol, early 90s, out of sound-system culture", "hip hop beats slowed down, soaked in dub bass and old soul samples, with sad singers on top.", "slow breakbeats, vinyl crackle, deep sub-bass, film-score strings", ["Massive Attack", "Portishead", "Tricky", "Morcheeba", "Sneaker Pimps", "DJ Shadow"], ["dub", "jungle", "neo-soul"]],
    "jungle": ["London, early 90s, rave meets reggae sound systems", "chopped breakbeats (often the Amen break) at about 165 bpm over slow reggae basslines, with an MC. it grew into drum & bass.", "drums twice as fast as the bass, ragga vocals, pirate-radio shout-outs", ["Shy FX", "Goldie", "Remarc", "DJ Hype", "Rebel MC", "Congo Natty"], ["UK garage", "dub", "footwork"]],
    "dream pop": ["UK and US, 80s–90s", "pop drowned in reverb. sometimes you can't make out the words, and that's the point.", "chiming guitars, echo everywhere, voices used as texture", ["Cocteau Twins", "Mazzy Star", "Julee Cruise", "Galaxie 500", "Beach House", "Slowdive"], ["shoegaze", "ambient", "bedroom pop"]],
    "shoegaze": ["UK, late 80s–early 90s", "bands so busy with their effects pedals they stared at their shoes. walls of distorted guitar with the singing buried inside.", "bending, wobbling guitar chords, vocals under the noise, loudness that feels soft", ["My Bloody Valentine", "Slowdive", "Ride", "Lush", "Chapterhouse", "Swirlies"], ["dream pop", "drone", "post-punk"]],
    "minimal wave": ["home studios, late 70s–80s, often released on cassette", "DIY synth songs made with one cheap synth and a drum machine. the name comes from Veronica Vasicka's reissue label (2005).", "bare drum machines, one or two synth lines, cold vocals", ["Oppenheimer Analysis", "Martin Dupont", "Das Ding", "Deux", "Solid Space"], ["darkwave", "EBM", "post-punk"]],
    "italo disco": ["Italy, early–mid 80s", "synth disco sung in heavily accented English. futuristic and a bit lonely.", "arpeggiated synth bass, vocoders, melancholy melodies over dancefloor drums", ["Gazebo", "Ryan Paris", "Kano", "Klein + M.B.O.", "Doctor's Cat", "Den Harrow"], ["french touch", "synthwave", "electro"]],
    "dub": ["Jamaica, late 60s–70s", "producers took reggae songs apart: drums and bass up front, echo and reverb, vocals dropping in and out. the mixing desk became the instrument.", "space, delay tails, bass you feel in your chest, sounds disappearing", ["King Tubby", "Lee 'Scratch' Perry", "Scientist", "Augustus Pablo", "Prince Jammy", "Mad Professor"], ["trip-hop", "jungle", "ambient"]],
    "ambient": ["Brian Eno named it in 1978 with 'Music for Airports'", "music meant to be 'as ignorable as it is interesting'. it sits in a room like a colour.", "no beat or a slow one, long tones, loops that drift out of sync", ["Brian Eno", "Harold Budd", "Hiroshi Yoshimura", "Laraaji", "Gigi Masin", "Aphex Twin"], ["j-ambient", "new age", "drone"]],
    "drone": ["New York minimalism in the 60s, then everywhere", "one sustained sound held for a long time, until the overtones start to sing.", "notes that never change, hidden harmonics, time slowing down", ["La Monte Young", "Éliane Radigue", "Pauline Oliveros", "Tony Conrad", "Sunn O)))", "Stars of the Lid"], ["ambient", "free jazz", "kosmische"]],
    "witch house": ["the internet, around 2009–2011", "slowed and chopped hip hop, horror-film synths, occult imagery, band names written in triangles and symbols.", "pitched-down vocals, heavy reverb, slow trap drums, menace", ["Salem", "oOoOO", "Holy Other", "Balam Acab", "White Ring"], ["phonk", "darkwave", "vaporwave"]],
    "vaporwave": ["the internet, early 2010s", "loops of 80s–90s mall music, smooth jazz and corporate jingles, slowed until they feel haunted. part nostalgia, part joke about shopping.", "slowed samples, loops that don't resolve, a feeling of an empty mall", ["Macintosh Plus", "Chuck Person", "Saint Pepsi", "2814", "Blank Banshee"], ["city pop", "library music", "lounge"]],
    "hyperpop": ["London's PC Music label (2013) and SOPHIE, then the internet", "pop pushed until it squeaks: pitched-up voices, candy-plastic sounds, emotions at full volume.", "chipmunk vocals, metallic drums, sudden drops, sugar", ["SOPHIE", "A. G. Cook", "Charli XCX", "100 gecs", "Hannah Diamond", "Dorian Electra"], ["bedroom pop", "witch house", "phonk"]],
    "neo-soul": ["US, late 90s", "soul brought back with hip hop drums and jazz chords. the Soulquarians crew and J Dilla's lazy, swaying beats.", "drums that land slightly late, warm Rhodes, layered harmonies", ["D'Angelo", "Erykah Badu", "Lauryn Hill", "Jill Scott", "Maxwell", "Bilal"], ["boom bap", "spiritual jazz", "trip-hop"]],
    "boom bap": ["New York, late 80s–90s, hip hop's 'golden age'", "named after the kick (boom) and the snare (bap). jazz and soul records chopped on samplers like the SP-1200 and MPC.", "dusty samples, hard snares, rapping as storytelling", ["DJ Premier", "Pete Rock", "A Tribe Called Quest", "Gang Starr", "Nas", "Wu-Tang Clan"], ["neo-soul", "library music", "spiritual jazz"]],
    "baile funk": ["the favelas of Rio de Janeiro, late 80s–90s", "Miami bass records turned into Rio's own party music, played at huge street dances called bailes.", "the tamborzão drum pattern, chanted call-and-response, rough samples", ["DJ Marlboro", "MC Marcinho", "Tati Quebra Barraco", "Deize Tigrona", "DJ Rennan da Penha"], ["gqom", "mahraganat", "amapiano"]],
    "amapiano": ["the townships of Gauteng, South Africa, mid-2010s", "deep house with jazz piano and kwaito, built around a deep 'log drum' bass.", "the log drum, soft piano chords, a slow rolling groove around 112 bpm", ["Kabza De Small", "DJ Maphorisa", "Focalistic", "Kelvin Momo", "Uncle Waffles", "Tyler ICU"], ["gqom", "deep house", "highlife"]],
    "gqom": ["Durban, South Africa, early 2010s, passed around on WhatsApp", "raw, dark, minimal dance music with broken kick patterns. the name copies the sound of the drum.", "kicks that never land where you expect, chants, empty space", ["DJ Lag", "Distruction Boyz", "Babes Wodumo", "Rudeboyz", "Citizen Boy"], ["amapiano", "footwork", "baile funk"]],
    "footwork": ["Chicago, 2000s, out of juke and ghetto house", "160 bpm music made for dance battles, with feet moving faster than the eye.", "rapid triplet drums, vocal samples stuttered into rhythm, half-time bass", ["RP Boo", "DJ Rashad", "DJ Spinn", "Traxman", "Jlin"], ["jungle", "gqom", "acid house"]],
    "UK garage": ["London, late 90s, pirate radio", "American garage house with a shuffle: skippy '2-step' beats and sped-up R&B vocals.", "swinging hi-hats, skipping kicks, pitched vocals, MCs", ["MJ Cole", "Artful Dodger", "Todd Edwards", "Wookie", "El-B", "So Solid Crew"], ["jungle", "deep house", "neo-soul"]],
    "french touch": ["Paris, late 90s", "disco records filtered and looped into house music. Daft Punk, Cassius and friends.", "filter sweeps, compressed disco loops, robot vocals", ["Daft Punk", "Cassius", "Stardust", "Étienne de Crécy", "Bob Sinclar", "Air"], ["italo disco", "deep house", "yé-yé"]],
    "yé-yé": ["France, 1960s", "teen pop named after the 'yeah yeah' of English records. many of the songs were written by Serge Gainsbourg.", "light voices, twangy guitars, sweet tunes with sharp lyrics underneath", ["Françoise Hardy", "France Gall", "Sylvie Vartan", "Jacqueline Taïeb", "Chantal Goya", "Serge Gainsbourg"], ["chanson", "shibuya-kei", "bossa nova"]],
    "chanson": ["France, the cabarets and Left Bank cafés", "song where the words matter most. poetry sung close to the listener.", "voice and lyrics first, accordion or piano, theatre", ["Édith Piaf", "Jacques Brel", "Barbara", "Georges Brassens", "Juliette Gréco", "Léo Ferré"], ["yé-yé", "fado", "rebetiko"]],
    "arabic jazz": ["Beirut, Tunis, Paris, from the 70s on", "jazz played in the maqam system, with the oud, quarter tones and Arabic rhythms.", "notes between the piano keys, odd time signatures, improvisation on the oud and trumpet", ["Ziad Rahbani", "Rabih Abou-Khalil", "Anouar Brahem", "Ibrahim Maalouf", "Toufic Farroukh", "Dhafer Youssef"], ["ethio-jazz", "spiritual jazz", "sha'abi"]],
    "sha'abi": ["'popular' music, with two homes: the streets of Cairo and the Casbah of Algiers", "in Egypt, Ahmed Adaweya's working-class street pop of the 70s. in Algeria, chaâbi: long, poetic songs played on the mandole.", "Cairo: brass, wit and slang. Algiers: mandole, banjo, piano and storytelling", ["Ahmed Adaweya", "Shaaban Abdel Rahim", "Hakim", "El Hadj M'Hamed El Anka", "Dahmane El Harrachi", "Amar Ezzahi"], ["mahraganat", "raï", "gnawa"]],
    "mahraganat": ["Cairo's working-class neighbourhoods, late 2000s", "'festivals': electronic street-wedding music with Auto-Tune and keyboard solos. hugely popular, and banned from some venues by the musicians' union in 2020.", "pounding electro beats, Auto-Tuned chants, frantic keyboard", ["Islam Chipsy", "Oka & Ortega", "Hassan Shakosh", "Hamo Bika", "Sadat"], ["sha'abi", "baile funk", "gqom"]],
    "khaleeji": ["the Gulf: Kuwait, Saudi Arabia, Bahrain, the UAE", "Gulf pop and song, rooted in sea and desert traditions, carried by the oud and hand claps.", "6/8 swing, layered hand claps, oud, the ululating chorus", ["Mohammed Abdu", "Abdallah Al Rowaished", "Talal Maddah", "Ahlam", "Nabil Shuail", "Fatima Al Qadiri"], ["sha'abi", "dabke", "arabic jazz"]],
    "gnawa": ["Morocco, among descendants of people brought from sub-Saharan Africa", "spiritual music for all-night trance ceremonies (lila), led by a master (maâlem).", "the guembri (three-string bass lute), iron castanets (qraqeb), chants that loop until the room changes", ["Maâlem Mahmoud Guinia", "Maâlem Hamid El Kasri", "Hassan Hakmoun", "Nass El Ghiwane", "Maâlem Mokhtar Gania"], ["desert blues", "spiritual jazz", "raï"]],
    "desert blues": ["the Sahara: Mali, Niger, Tuareg communities", "guitar music of the desert (assouf: longing). Ali Farka Touré in Mali, then Tuareg bands formed in exile and rebellion.", "circular guitar riffs, hand claps, call-and-response, heat", ["Ali Farka Touré", "Tinariwen", "Bombino", "Mdou Moctar", "Tamikrest", "Etran de L'Aïr"], ["gnawa", "highlife", "anatolian psych"]],
    "highlife": ["Ghana, early 20th century onward", "dance-band music mixing local rhythms with brass, guitars and jazz. the 'high life' of the clubs.", "bright guitar lines, horns, an easy lilting groove", ["E.T. Mensah", "Ebo Taylor", "Pat Thomas", "K. Frimpong", "Nana Ampadu", "Gyedu-Blay Ambolley"], ["ethio-jazz", "desert blues", "amapiano"]],
    "cumbia": ["Colombia's Caribbean coast, then all of Latin America", "Indigenous, African and Spanish roots in one dance. Peru made it psychedelic (chicha), Mexico and Argentina made their own.", "the scraping güiro, a two-step shuffle, accordion or surf guitar", ["Lucho Bermúdez", "Andrés Landero", "Totó la Momposina", "Los Destellos", "Los Mirlos", "Celso Piña"], ["tropicália", "baile funk", "exotica"]],
    "bossa nova": ["Rio de Janeiro, late 1950s", "samba slowed down and whispered. João Gilberto's guitar rhythm, Jobim's chords, Vinicius de Moraes' words.", "a syncopated guitar pulse, quiet voices, jazz chords", ["João Gilberto", "Antônio Carlos Jobim", "Astrud Gilberto", "Nara Leão", "Elis Regina", "Marcos Valle"], ["tropicália", "shibuya-kei", "lounge"]],
    "kosmische": ["West Germany, late 60s–70s (often called krautrock)", "bands who refused both Anglo rock and the German past, and built something new: repetition, electronics, endless motion.", "the 'motorik' straight beat, long jams, early synths", ["Can", "Neu!", "Kraftwerk", "Cluster", "Harmonia", "Tangerine Dream"], ["ambient", "minimal wave", "drone"]],
    "new age": ["70s–80s, healing centres and private-press cassettes", "music for meditation, massage and inner travel. dismissed for years, rediscovered through reissues in the 2010s.", "synth pads, chimes, nature sounds, no tension at all", ["Laraaji", "Iasos", "Constance Demby", "Suzanne Ciani", "Steven Halpern", "Beverly Glenn-Copeland"], ["ambient", "j-ambient", "library music"]],
    "library music": ["studios in London, Rome and Paris, 60s–70s", "music recorded for TV and film to license, never sold in shops. hip hop producers later mined it for samples.", "funky drums, moody strings, short themes made to be cut", ["Piero Umiliani", "Alan Hawkshaw", "Keith Mansfield", "Alessandro Alessandroni", "Janko Nilović", "Brian Bennett"], ["boom bap", "exotica", "lounge"]],
    "exotica": ["1950s America, tiki bars and hi-fi stereo", "an invented 'tropical' fantasy with bird calls and jungle drums. beautiful, and worth questioning: whose exotic?", "vibraphone, bird calls, gongs, reverb, a dream of somewhere else", ["Martin Denny", "Les Baxter", "Arthur Lyman", "Yma Sumac"], ["lounge", "library music", "cumbia"]],
    "lounge": ["50s–60s 'space-age bachelor pad' records", "orchestral pop made to show off new stereo systems, full of whistles, Moog and swooshing sounds.", "ping-pong stereo, wordless choirs, strange early synths", ["Juan García Esquivel", "Henry Mancini", "Burt Bacharach", "Enoch Light", "Perrey and Kingsley", "Stereolab"], ["exotica", "shibuya-kei", "bossa nova"]],
    "deep house": ["Chicago and New Jersey, mid-80s", "house music with jazz and soul chords, warmer and slower than the rest.", "lush chords, soft pads, a steady four-on-the-floor", ["Larry Heard", "Kerri Chandler", "Moodymann", "Theo Parrish", "Frankie Knuckles", "Joe Smooth"], ["acid house", "UK garage", "amapiano"]],
    "acid house": ["Chicago, mid-80s, then UK raves in 1988", "a failed bass machine (the Roland TB-303) twisted into squelching, hypnotic lines.", "the 303 squelch rising and falling, drum machines, the smiley face", ["Phuture", "Armando", "Adonis", "Sleezy D", "A Guy Called Gerald", "Hardfloor"], ["deep house", "electro", "EBM"]],
    "electro": ["New York and Detroit, early 80s", "Kraftwerk's machines meet funk and hip hop on the Roland TR-808.", "808 drums, robot voices, funk basslines", ["Afrika Bambaataa", "Cybotron", "Mantronix", "Egyptian Lover", "Drexciya", "Dopplereffekt"], ["italo disco", "acid house", "EBM"]],
    "EBM": ["Belgium and Germany, 80s (Front 242 named it)", "Electronic Body Music: hard, sequenced synth bass and barked vocals, made to move the body.", "relentless synth bass sequences, marching drums, shouted vocals", ["Front 242", "DAF", "Nitzer Ebb", "Liaisons Dangereuses", "A Split-Second"], ["darkwave", "minimal wave", "post-punk"]],
    "darkwave": ["Europe, late 70s–80s, and a big revival today", "post-punk and synths in a minor key. romantic, cold, beautiful in black.", "cold synths, chorus-heavy bass, deep sad vocals", ["Clan of Xymox", "Xmal Deutschland", "Kirlian Camera", "Lebanon Hanover", "Boy Harsher", "Molchat Doma"], ["post-punk", "minimal wave", "witch house"]],
    "post-punk": ["UK, late 70s–early 80s, after punk", "punk's energy with art-school ideas, dub bass and politics.", "bass up front, angular guitar, space borrowed from dub", ["Joy Division", "Wire", "Gang of Four", "The Slits", "Siouxsie and the Banshees", "ESG"], ["no wave", "darkwave", "dub"]],
    "no wave": ["New York, late 70s", "a reaction against new wave: noise, skronk, funk turned inside out. the 1978 'No New York' compilation.", "atonal guitar, saxophone squeals, deliberate ugliness, dance beats breaking through", ["James Chance and the Contortions", "Teenage Jesus and the Jerks", "DNA", "Mars", "Liquid Liquid", "ESG"], ["post-punk", "free jazz", "riot grrrl"]],
    "riot grrrl": ["Olympia, Washington and Washington DC, early 90s", "feminist punk with zines, meetings and 'girls to the front'. as much a network as a sound.", "raw guitars, shouted lyrics about bodies and power, homemade recordings", ["Bikini Kill", "Bratmobile", "Heavens to Betsy", "Sleater-Kinney", "Huggy Bear", "Team Dresch"], ["post-punk", "lo-fi", "no wave"]],
    "lo-fi": ["bedrooms with 4-track cassette recorders, 80s–90s", "music recorded at home, where the hiss is part of the song.", "tape hiss, out-of-tune instruments, intimacy", ["Daniel Johnston", "R. Stevie Moore", "Beat Happening", "Guided by Voices", "Sebadoh"], ["bedroom pop", "riot grrrl", "minimal wave"]],
    "bedroom pop": ["laptops, SoundCloud and YouTube, 2010s", "pop made alone in a bedroom and shared straight to the internet.", "soft vocals, home-recorded guitars, laptop drums, diary lyrics", ["Clairo", "Cuco", "girl in red", "beabadoobee", "Boy Pablo", "Alex G"], ["lo-fi", "dream pop", "hyperpop"]],
    "spiritual jazz": ["after John Coltrane's 'A Love Supreme' (1965)", "jazz as prayer: modal, cosmic, devotional, often Afrocentric.", "long modal vamps, harp, chants, saxophones reaching upward", ["Pharoah Sanders", "Alice Coltrane", "Sun Ra", "Lonnie Liston Smith", "Doug Carn", "Dorothy Ashby"], ["free jazz", "ethio-jazz", "gnawa"]],
    "free jazz": ["Ornette Coleman's 'Free Jazz' (1960), then Chicago and Europe", "jazz without fixed chords or a fixed beat. players listening and reacting in real time.", "no steady tempo, collective improvisation, cries and whispers", ["Ornette Coleman", "Cecil Taylor", "Albert Ayler", "Archie Shepp", "Art Ensemble of Chicago", "Peter Brötzmann"], ["spiritual jazz", "no wave", "drone"]],
    "fado": ["Lisbon (Alfama, Mouraria) and Coimbra, 19th century on", "songs of saudade: longing for what's gone or never came.", "the twelve-string Portuguese guitar, a voice close to tears", ["Amália Rodrigues", "Carlos Paredes", "Mariza", "Ana Moura", "Camané", "Carminho"], ["rebetiko", "chanson", "bossa nova"]],
    "rebetiko": ["Greek ports, 1920s–50s, after the 1922 refugee wave from Asia Minor", "the 'Greek blues' of refugees, smokers and outsiders, played on the bouzouki.", "bouzouki, the 9/8 zeibekiko, songs about prison, love and hashish", ["Markos Vamvakaris", "Roza Eskenazi", "Vassilis Tsitsanis", "Sotiria Bellou", "Rita Abatzi"], ["fado", "anatolian psych", "sha'abi"]],
    "anatolian psych": ["Turkey, late 60s–70s (Anadolu rock)", "Turkish folk songs played with fuzz guitars and electric saz.", "folk melodies on distorted guitars, odd meters, the bağlama", ["Erkin Koray", "Selda Bağcan", "Barış Manço", "Cem Karaca", "Moğollar", "Altın Gün"], ["tropicália", "desert blues", "rebetiko"]],
    "j-ambient": ["Japan, 80s: kankyō ongaku, 'environmental music'", "music commissioned for buildings, museums and products, meant to blend with a space. YouTube rediscovered it.", "gentle synths, marimba, water, space between the notes", ["Hiroshi Yoshimura", "Midori Takada", "Satoshi Ashikawa", "Yoshio Ojima", "Haruomi Hosono", "Inoyamaland"], ["ambient", "new age", "city pop"]],
    "k-indie": ["Seoul's Hongdae clubs, 90s onward (and the 70s rock before it)", "the Korean scene outside K-pop: garage rock, post-rock with traditional instruments, bedroom shoegaze.", "gayageum and haegeum next to guitars, raw production, very Seoul", ["Sanullim", "Jang Kiha and the Faces", "Hyukoh", "Se So Neon", "Jambinai", "Parannoul"], ["shoegaze", "post-punk", "bedroom pop"]],
    "phonk": ["Memphis rap tapes of the 90s, rediscovered on SoundCloud in the 2010s", "lo-fi Memphis horror-rap, chopped and slowed, later turned into 'drift phonk' with cowbells.", "cowbell melodies, Memphis vocal samples, slowed tape sound", ["Three 6 Mafia", "Tommy Wright III", "DJ Screw", "SpaceGhostPurrp", "DJ Smokey", "Kordhell"], ["witch house", "boom bap", "baile funk"]],
    "synthwave": ["the internet, late 2000s, in love with 80s film scores", "the soundtrack to an 80s film that never existed. the film 'Drive' (2011) made it famous.", "big gated drums, analogue-style synths, night driving", ["Kavinsky", "College", "Com Truise", "Lazerhawk", "Mitch Murder", "Perturbator"], ["italo disco", "vaporwave", "darkwave"]]
  };
  window.RABBIT = RH;
  const yt = q => `https://www.youtube.com/results?search_query=${enc(q)}`;
  const rhHTML = (g) => {
    const r = RH[g]; if (!r) return `<div class="rh"><h3>${esc(g)}</h3><p>no rabbit hole written yet.</p></div>`;
    const [where, what, ear, artists, next] = r;
    return `<div class="rh" data-rhg="${esc(g)}"><small>rabbit hole</small><h3>${esc(g)}</h3><p class="rhw">${esc(where)}</p><p>${esc(what)}</p>
      <p class="rhear"><b>listen for</b>${esc(ear)}</p>
      <p class="rhtry"><b>try this</b>play ${esc(artists[0])}, then ${esc(artists[artists.length - 1])}. what stays the same? that's the genre.</p>
      <h4>start with these</h4><div class="rhart">${artists.map(a => `<div class="rha"><b>${esc(a)}</b><a href="${yt(a + " " + g)}" target="_blank" rel="noopener">▶ YouTube</a><a href="https://bandcamp.com/search?q=${enc(a)}" target="_blank" rel="noopener">Bandcamp</a><a href="https://www.discogs.com/search/?q=${enc(a)}&type=artist" target="_blank" rel="noopener">Discogs</a></div>`).join("")}</div>
      <h4>listen for longer</h4><div class="rhlinks">
        <button class="xp" data-tag="${esc(g)}">📻 live ${esc(g)} stations</button>
        <a class="xp" href="${yt(g + " mix")}" target="_blank" rel="noopener">▶ YouTube mixes</a>
        <a class="xp" href="https://www.youtube.com/results?search_query=${enc(g)}&sp=EgIQAw%253D%253D" target="_blank" rel="noopener">▶ YouTube playlists</a>
        <a class="xp" href="https://open.spotify.com/search/${enc(g)}/playlists" target="_blank" rel="noopener">Spotify playlists</a>
        <a class="xp" href="https://www.mixcloud.com/search/?q=${enc(g)}" target="_blank" rel="noopener">radio shows on Mixcloud</a>
        <a class="xp" href="https://www.nts.live/" target="_blank" rel="noopener">NTS</a>
        <a class="xp" href="https://bandcamp.com/search?q=${enc(g)}&item_type=t" target="_blank" rel="noopener">Bandcamp</a>
        <a class="xp" href="https://rateyourmusic.com/search?searchterm=${enc(g)}&searchtype=g" target="_blank" rel="noopener">RYM</a>
        <a class="xp" href="https://en.wikipedia.org/w/index.php?search=${enc(g + " music genre")}" target="_blank" rel="noopener">read about it</a></div>
      <h4>go deeper, sideways</h4><div class="rhnext">${next.map(n => `<button class="rhn" data-rh="${esc(n)}">${esc(n)} →</button>`).join("")}<button class="rhn sh" data-rh="*">✦ somewhere random</button><button class="rhn sh" data-rhall>all rabbit holes</button></div>
      <p class="rhsaved">✓ written in your journal</p></div>`;
  };
  const openRH = (g, into) => {
    const box = into || $("#mrPanel"); if (!box) return;
    if (g === "*") { const ks = Object.keys(RH); g = ks[Math.floor(Math.random() * ks.length)]; }
    box.innerHTML = rhHTML(g); box.scrollTop = 0; learn("sound", g, RH[g] ? RH[g][1] : "");
  };
  const allRH = (into) => { const box = into || $("#mrPanel"); box.innerHTML = `<h3>every rabbit hole</h3><p class="mrp">${Object.keys(RH).length} sounds, each with a story, artists, and places to keep listening.</p><div class="rhall">${Object.keys(RH).sort((a, b) => a.localeCompare(b)).map(g => `<button class="rhn" data-rh="${esc(g)}">${esc(g)}</button>`).join("")}</div>`; box.scrollTop = 0; };
  window.openRabbit = g => { if (!MR.classList.contains("open")) window.openMusic("wheel"); setTimeout(() => { openRH(g); }, 30); };
  if (MR) {
    MR.addEventListener("click", e => {
      const r = e.target.closest("[data-rh]"); if (r) { e.stopPropagation(); openRH(r.dataset.rh); return; }
      if (e.target.closest("[data-rhall]")) { e.stopPropagation(); allRH(); return; }
    }, true);
    /* after each spin, open the hole underneath the result */
    const pn = $("#mrPanel");
    new MutationObserver(() => {
      const out = $("#whOut"); if (!out || out.dataset.rh30) return;
      const b = out.querySelector(".whres b"); if (!b) return;
      out.dataset.rh30 = 1;
      const gs = b.textContent.split(" × ").map(s => s.trim()).filter(g => RH[g]);
      out.insertAdjacentHTML("beforeend", gs.map(g => `<button class="rhgo" data-rh="${esc(g)}">↓ fall into the ${esc(g)} rabbit hole</button>`).join(""));
      gs.forEach(g => learn("sound", g, RH[g][1]));
      setTimeout(() => { delete out.dataset.rh30; }, 50);
    }).observe(pn, {childList: true, subtree: true});
    new MutationObserver(() => { const w = $("#whGo"); if (w && !$("#whAll")) w.insertAdjacentHTML("afterend", `<button class="xp" id="whAll" data-rhall>browse all ${Object.keys(RH).length}</button>`); }).observe(pn, {childList: true});
  }

  /* ---------------- 3. a back button that always works ---------------- */
  const SKIP = new Set(["threshold", "passage", "login", "dial", "dialup", "boot", "intro"]);
  const stack = [];
  const isOv = el => el && el.classList && el.classList.contains("ov") && el.id && !SKIP.has(el.id);
  const openOvs = () => [...document.querySelectorAll(".ov.open")].filter(isOv);
  document.body.insertAdjacentHTML("beforeend", `<button id="back30" title="back (Esc)">← back</button>`);
  const BB = $("#back30");
  const refresh = () => { const any = openOvs().length || document.querySelector(".win:not(.hidden)"); BB.classList.toggle("on", !!any); };
  new MutationObserver(ms => {
    ms.forEach(m => { const el = m.target; if (!isOv(el)) return; const on = el.classList.contains("open"); const was = (m.oldValue || "").split(" ").includes("open");
      if (on && !was) { if (stack[stack.length - 1] !== el.id) { stack.push(el.id); if (stack.length > 30) stack.shift(); if (location.protocol.startsWith("http")) { try { history.pushState({g30: el.id}, ""); } catch(_) {} } } }
    });
    refresh();
  }).observe(document.body, {attributes: true, attributeFilter: ["class"], attributeOldValue: true, subtree: true});
  const goBack = () => {
    const box = $("#galbox"); if (box && box.classList.contains("open")) { box.classList.remove("open"); return; }
    const pop = document.querySelector(".pop30.open"); if (pop) { pop.classList.remove("open"); return; }
    const open = openOvs();
    if (open.length) {
      const top = open.sort((a, b) => (+getComputedStyle(b).zIndex || 0) - (+getComputedStyle(a).zIndex || 0))[0];
      top.classList.remove("open");
      while (stack.length && (stack[stack.length - 1] === top.id || !$("#" + stack[stack.length - 1]))) stack.pop();
      const prev = stack[stack.length - 1];
      if (prev && !openOvs().length) { const p = $("#" + prev); if (p) p.classList.add("open"); }
      refresh(); return;
    }
    const wins = [...document.querySelectorAll(".win:not(.hidden)")].sort((a, b) => (+getComputedStyle(b).zIndex || 0) - (+getComputedStyle(a).zIndex || 0));
    if (wins.length) { wins[0].classList.add("hidden"); refresh(); return; }
    try { goPlace("room"); } catch(_) {}
  };
  window.goBack30 = goBack;
  BB.onclick = goBack;
  window.addEventListener("popstate", () => { if (openOvs().length || document.querySelector(".win:not(.hidden)") || document.querySelector(".pop30.open")) goBack(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !e.target.matches("input, textarea")) goBack(); });

  /* ---------------- 4. the museum holds the archive and the links ---------------- */
  try {
    EXHIBITS.push({id: "archive", t: "✂ the archive", sub: "the collage table, every piece and plate", intro: "", pieces: () => []});
    EXHIBITS.push({id: "links", t: "↗ rabbit holes", sub: "the research sites, as rooms", intro: "", pieces: () => []});
    EXHIBITS.push({id: "garden", t: "✿ the weird garden", sub: "plants that break the rules", intro: "", pieces: () => []});
    const _og = openGallery;
    openGallery = function(id){ if (id === "archive") { closeOverlays(); return window.openSpecimens(); } if (id === "links") return openLinks(); if (id === "garden") return openGarden(); return _og(id); };
    window.openGallery = openGallery;
    $("#galtabs").addEventListener("click", e => { const b = e.target.closest("[data-ex]"); if (b && ["archive", "links", "garden"].includes(b.dataset.ex)) { e.stopImmediatePropagation(); openGallery(b.dataset.ex); } }, true);
    VERT.forEach(v => { v.p = v.p.filter(p => p[0] !== "specimens"); const g = v.p.find(p => p[0] === "gallery"); if (g) { g[2] = "The Museum"; g[3] = "real pieces, the archive, rabbit holes, the weird garden"; } });
    const hs = $("#hudSpec"); if (hs) hs.textContent = "🖼 the museum";
    if (hs) hs.onclick = () => openGallery("phones");
  } catch(_) {}

  const SH = window.SHELF_PUBLIC || [], PL = window.PILLARS_PUBLIC || {all: "everything"};
  const pillCol = {fashion: "#f08ab4", print: "#f2c230", scent: "#9b7bd8", beauty: "#e8432e", jewellery: "#2fc4b2", music: "#3aa0e0", objects: "#f27a2a", books: "#58b368", space: "#e6e1d3", film: "#b8b8b8"};
  const shot = (u, w) => `https://image.thum.io/get/width/${w || 900}/crop/${Math.round((w || 900) * 1.1)}/${u}`;
  document.body.insertAdjacentHTML("beforeend", `<div class="ov" id="links30"><div class="l30wrap">
      <div class="l30head"><div><small>the museum · rabbit holes</small><h2>what kind of rabbit hole are you into today?</h2></div><button class="bx" data-l30x>×</button></div>
      <div class="l30bar"><div class="l30pills">${Object.entries(PL).map(([k, v]) => `<button class="pl30 ${k === "all" ? "on" : ""}" data-pl="${k}" style="--c:${pillCol[k] || "#fff"}">${esc(v)}</button>`).join("")}</div>
        <button class="xp l30sh" data-l30shuffle>✦ shuffle me somewhere</button></div>
      <div class="l30grid" id="l30grid"></div></div></div>
    <div class="pop30" id="car30"><div class="c30box"><button class="bx" data-c30x>×</button><div class="c30track" id="c30track"></div>
      <div class="c30nav"><button data-c30="-1">❮</button><span id="c30dots"></span><button data-c30="1">❯</button></div><div class="c30act" id="c30act"></div></div></div>`);
  const LO = $("#links30");
  let lPill = "all";
  const paintLinks = () => {
    const list = SH.filter(s => lPill === "all" || s[4] === lPill);
    $("#l30grid").innerHTML = list.map(s => { const i = SH.indexOf(s); const c = pillCol[s[4]] || "#fff"; let host = ""; try { host = new URL(s[1]).hostname.replace("www.", ""); } catch(_) {}
      return `<button class="l30c" data-li="${i}" style="--c:${c}"><span class="l30img">${LIVE ? `<img src="${shot(s[1], 600)}" alt="" loading="lazy" onerror="this.remove()">` : ""}<i>${esc(s[0])}</i></span><b>${esc(s[0])}</b><small>${esc(host)} · ${esc(PL[s[4]] || s[4])}</small></button>`; }).join("");
  };
  let cI = 0, cSlides = [], cSrc = null;
  const openCar = i => {
    const s = SH[i]; if (!s) return; cSrc = i; const c = pillCol[s[4]] || "#fff";
    const same = SH.filter(x => x[4] === s[4] && x !== s).sort(() => Math.random() - .5).slice(0, 3);
    const pieces = s[4] === "fashion" || s[4] === "print" ? (window.PIECES_PUBLIC || []).slice().sort(() => Math.random() - .5).slice(0, 3) : [];
    cSlides = [
      `<div class="c30s hero" style="--c:${c}">${LIVE ? `<img src="${shot(s[1], 1100)}" alt="" onerror="this.remove()">` : ""}<div class="c30cap"><small>${esc(PL[s[4]] || "")}</small><h3>${esc(s[0])}</h3><p>${esc(s[2])}</p></div></div>`,
      `<div class="c30s txt" style="--c:${c}"><small>what to dig for here</small><h3>${esc(s[3])}</h3><p>start on the homepage, then follow anything with a year in it. write down one name you didn't know. that's the door to the next room.</p></div>`,
      `<div class="c30s more" style="--c:${c}"><small>rooms next door</small><div class="c30more">${same.map(x => `<button data-li="${SH.indexOf(x)}"><span>${LIVE ? `<img src="${shot(x[1], 400)}" alt="" onerror="this.remove()">` : ""}</span><b>${esc(x[0])}</b><small>${esc(x[2])}</small></button>`).join("")}</div></div>`
    ].concat(pieces.length ? [`<div class="c30s more" style="--c:${c}"><small>from the archive</small><div class="c30more">${pieces.map(p => `<button data-l30arch><span><img src="${(typeof SPIMG !== "undefined" && SPIMG[p.k]) || ""}" alt=""></span><b>${esc(p.house || p.t || "")}</b><small>${esc(p.what || p.when || "")}</small></button>`).join("")}</div></div>`] : []);
    cI = 0; drawCar();
    $("#c30act").innerHTML = `<a class="xp big" href="${s[1]}" target="_blank" rel="noopener">enter the site ↗</a><button class="xp" data-l30shuffle>✦ shuffle</button><button class="xp" data-l30spark>✦ spark: go sideways</button>`;
    $("#car30").classList.add("open"); learn("source", s[0], s[2]);
  };
  const drawCar = () => { $("#c30track").innerHTML = cSlides[cI] || ""; $("#c30dots").innerHTML = cSlides.map((_, i) => `<i class="${i === cI ? "on" : ""}" data-c30d="${i}"></i>`).join(""); };
  const shuffleTo = (otherPillar) => { const cur = SH[cSrc]; const pool = otherPillar && cur ? SH.filter(x => x[4] !== cur[4]) : SH; openCar(SH.indexOf(pool[Math.floor(Math.random() * pool.length)])); };
  function openLinks(){ closeOverlays(); paintLinks(); LO.classList.add("open"); }
  window.openLinks = openLinks;
  document.addEventListener("click", e => {
    const t = e.target;
    if (t.closest("[data-l30x]")) { LO.classList.remove("open"); return; }
    const pl = t.closest("[data-pl]"); if (pl) { lPill = pl.dataset.pl; LO.querySelectorAll(".pl30").forEach(b => b.classList.toggle("on", b === pl)); paintLinks(); return; }
    const li = t.closest("[data-li]"); if (li && (LO.contains(li) || $("#car30").contains(li))) { openCar(+li.dataset.li); return; }
    if (t.closest("[data-l30shuffle]")) { shuffleTo(false); return; }
    if (t.closest("[data-l30spark]")) { shuffleTo(true); return; }
    if (t.closest("[data-l30arch]")) { $("#car30").classList.remove("open"); LO.classList.remove("open"); window.openSpecimens(); return; }
    if (t.closest("[data-c30x]") || t.id === "car30") { $("#car30").classList.remove("open"); return; }
    const cn = t.closest("[data-c30]"); if (cn) { cI = (cI + +cn.dataset.c30 + cSlides.length) % cSlides.length; drawCar(); return; }
    const cd = t.closest("[data-c30d]"); if (cd) { cI = +cd.dataset.c30d; drawCar(); return; }
  });
  document.addEventListener("keydown", e => { if (!$("#car30").classList.contains("open")) return; if (e.key === "ArrowRight") { cI = (cI + 1) % cSlides.length; drawCar(); } if (e.key === "ArrowLeft") { cI = (cI - 1 + cSlides.length) % cSlides.length; drawCar(); } });

  /* ---------------- 5. the weird garden ---------------- */
  const PLANTS = [
    ["Ghost plant", "Monotropa uniflora", "ghost", "Asia and North America", "no chlorophyll at all, so it's white as paper. it steals sugar from fungi that are plugged into tree roots, and turns black if you pick it.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c1/Monotropa_uniflora_in_Penwood_State_Park_3%2C_2009-07-03.jpg/960px-Monotropa_uniflora_in_Penwood_State_Park_3%2C_2009-07-03.jpg", "Sage Ross, CC BY-SA 3.0"],
    ["Corpse lily", "Rafflesia arnoldii", "carrion", "Sumatra and Borneo", "no leaves, no stem, no roots. it lives inside a vine and appears as a single flower up to a metre wide that smells of rotting meat, to call in flies.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dd/Rafflesia_arnoldii%2C_Sumatra.jpg/960px-Rafflesia_arnoldii%2C_Sumatra.jpg", "LukeTriton, CC BY-SA 4.0"],
    ["Titan arum", "Amorphophallus titanum", "carrion", "Sumatra", "a flower spike taller than a person that blooms only every few years for a day or two. it heats itself up to push its smell of dead animal further.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Amorphophallus_titanum_%28corpse_flower%29_-_2.jpg/960px-Amorphophallus_titanum_%28corpse_flower%29_-_2.jpg", "Sailing moose, CC BY-SA 4.0"],
    ["Jackal food", "Hydnora africana", "ghost", "southern Africa", "lives underground on the roots of euphorbias. only the flower pushes through the sand: fleshy, open-mouthed, smelling of dung, trapping beetles inside.", "https://upload.wikimedia.org/wikipedia/commons/d/d6/HydnoraAfricanaKarasburgDistrictNamibia2002Musselman.jpg", "Lytton John Musselman, CC BY-SA 3.0"],
    ["Welwitschia", "Welwitschia mirabilis", "fossil", "the Namib desert", "grows only two leaves in its whole life, and they never stop growing, shredding into ribbons over hundreds, sometimes more than a thousand, years.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0c/Welwitschia_mirabilis%282%29.jpg/960px-Welwitschia_mirabilis%282%29.jpg", "Thomas Schoch, CC BY-SA 3.0"],
    ["Monkey-face orchid", "Dracula simia", "mimic", "cloud forests of Ecuador and Peru", "the centre of the flower looks like a monkey's face. it smells of ripe oranges.", "https://upload.wikimedia.org/wikipedia/commons/5/5a/15.Dracula_simia%2C_the_Monkey_Face_Orchid_%2810957423336%29.jpg", "Dick Culbert, CC BY 2.0"],
    ["Living stones", "Lithops", "mimic", "southern Africa", "two fat leaves that look exactly like pebbles, so nothing eats them. a little window on top lets light in.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/89/Lithops_2.jpg/960px-Lithops_2.jpg", "yellowcloud, CC BY 2.0"],
    ["Giant pitcher plant", "Nepenthes rajah", "carnivore", "Mount Kinabalu, Borneo", "pitchers big enough to hold litres of liquid. tree shrews lick its nectar and leave their droppings in it, which feeds the plant.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0d/Nepenthes_rajah.png/960px-Nepenthes_rajah.png", "public domain"],
    ["Sensitive plant", "Mimosa pudica", "moves", "tropical Americas, now everywhere", "folds its leaves shut the moment you touch it. in one experiment it learned to stop folding when the touches proved harmless.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/26/Mimosa_pudica_in_September_month.jpg/960px-Mimosa_pudica_in_September_month.jpg", "Suyash Dwivedi, CC BY-SA 4.0"],
    ["Black bat flower", "Tacca chantrieri", "strange", "Southeast Asia", "near-black petals spread like wings, with long whiskers trailing far below the flower.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/Bat_Flower_or_Cat_Whiskers_%28Tacca_Chantrieri%29_%2849532732922%29.jpg/960px-Bat_Flower_or_Cat_Whiskers_%28Tacca_Chantrieri%29_%2849532732922%29.jpg", "geoff mckay, CC BY 2.0"],
    ["Balanophora", "Balanophora", "ghost", "Asia and the Pacific", "looks like a mushroom, is actually a flowering plant. no chlorophyll; it feeds on the roots of trees.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/43/Hup_Patad08.jpg/960px-Hup_Patad08.jpg", "Meneerke bloem, CC BY-SA 3.0"],
    ["Hot lips", "Palicourea elata", "mimic", "rainforests of Central and South America", "two bright red bracts shaped exactly like a kiss, to attract hummingbirds and butterflies.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/Psychotria_elata_1.jpg/960px-Psychotria_elata_1.jpg", "Franz Xaver, CC BY-SA 3.0"],
    ["Bee orchid", "Ophrys apifera", "mimic", "Europe and the Mediterranean", "the flower imitates a female bee so male bees try to mate with it and carry its pollen. botanists call this sexual deception.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a9/%28MHNT%29_Ophrys_apifera_-_Villeneuve-l%C3%A8s-Bouloc_-_Flower.jpg/960px-%28MHNT%29_Ophrys_apifera_-_Villeneuve-l%C3%A8s-Bouloc_-_Flower.jpg", "Didier Descouens, CC BY-SA 4.0"],
    ["Dragon arum", "Dracunculus vulgaris", "carrion", "Greece, Crete and the Balkans", "a huge maroon sheath around a black spike, smelling of carrion for a day to fool the flies.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Dracunculus_vulgaris_LC0044.jpg/960px-Dracunculus_vulgaris_LC0044.jpg", "Jörg Hempel, CC BY-SA 3.0 de"],
    ["Queen of the Andes", "Puya raimondii", "strange", "the high Andes of Peru and Bolivia", "waits many decades to flower once, with a spike several metres high, and then dies.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/32/Puya_raimondii_h%C3%A1bito.jpg/960px-Puya_raimondii_h%C3%A1bito.jpg", "Pepe Roque, CC BY-SA 3.0"],
    ["Giant water lily", "Victoria amazonica", "strange", "the Amazon", "floating leaves wider than a bed. the flower opens white on its first night, traps beetles, and opens again pink.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b4/Victoria_amazonica_edit_1.jpg/960px-Victoria_amazonica_edit_1.jpg", "Bilby, CC BY 3.0"],
    ["Baseball plant", "Euphorbia obesa", "mimic", "South Africa", "a perfect striped ball. endangered in the wild because collectors loved it too much.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Euphorbia_obesa_obesa_15102244.jpg/960px-Euphorbia_obesa_obesa_15102244.jpg", "Andrew Hankey, CC BY-SA 4.0"],
    ["Fasciation", "a growth accident", "teratology", "anywhere", "the growing tip stretches into a line instead of a point, so stems grow flat, crested, fan-shaped. caused by mutation, bacteria, insects or injury.", "https://upload.wikimedia.org/wikipedia/commons/d/d7/MulesEarFasciated_107393.jpg", "Perduejn, CC BY 3.0"],
    ["Phyllody", "flowers turning into leaves", "teratology", "anywhere", "petals become little green leaves. usually caused by tiny bacteria (phytoplasmas) carried by leafhoppers.", "https://upload.wikimedia.org/wikipedia/commons/c/c0/Phyllody_on_Coneflower_with_aster_yellows.jpg", "Estreya, CC BY-SA 3.0"],
    ["Variegation", "patches without green", "teratology", "anywhere", "parts of the leaf can't make chlorophyll, from a genetic mix inside one plant (a chimera) or a virus. collectors pay a lot for it.", "https://upload.wikimedia.org/wikipedia/commons/7/79/Cryptocarya_williwilliana_-_juvenile_variegated.jpg", "Peter Woodard, public domain"],
    ["Sundew", "Drosera", "carnivore", "every continent except Antarctica", "leaves covered in glittering sticky tentacles that curl around insects. Darwin wrote a whole book about them.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c3/Drosera_spatulata_KansaiHabit.jpg/960px-Drosera_spatulata_KansaiHabit.jpg", "Jan Wieneke, CC BY-SA 3.0"],
    ["Venus flytrap", "Dionaea muscipula", "carnivore", "a small area of North and South Carolina", "the trap only shuts if a trigger hair is touched twice in a short time. it counts.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/37/Venus_Flytrap_showing_trigger_hairs.jpg/960px-Venus_Flytrap_showing_trigger_hairs.jpg", "Noah Elhardt, CC BY-SA 2.5"],
    ["Trumpet pitcher", "Sarracenia", "carnivore", "North America", "tall veined trumpets with slippery lips; insects fall in and can't climb out.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Sarracenia_ne1.JPG/960px-Sarracenia_ne1.JPG", "Noah Elhardt, CC BY-SA 3.0"],
    ["Baby toes", "Fenestraria rhopalophylla", "mimic", "Namibia and South Africa", "grows buried in sand with only clear 'windows' at the leaf tips showing; light travels down inside the leaf.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/Fenestraria_rhopalophylla.jpg/960px-Fenestraria_rhopalophylla.jpg", "CC BY-SA 2.5"],
    ["Giant Dutchman's pipe", "Aristolochia gigantea", "carrion", "Brazil", "a huge veined flower that lures flies into its tube and holds them until they're dusted with pollen.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/Aristolochia_gigantea-IMG_5523.jpg/960px-Aristolochia_gigantea-IMG_5523.jpg", "C T Johansson, CC BY-SA 3.0"],
    ["Sapria", "Sapria himalayana", "carrion", "northeast India and Southeast Asia", "a cousin of the corpse lily: a parasite with no leaves, a red spotted flower, and very rarely seen.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Saprea.jpg/960px-Saprea.jpg", "Rohit Naniwadekar, CC BY-SA 3.0"],
    ["Starfish flower", "Stapelia gigantea", "carrion", "southern Africa", "a hairy, flesh-coloured star that smells so much like meat that flies lay their eggs on it.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Stapelia_gigantea00.jpg/960px-Stapelia_gigantea00.jpg", "Camilla Floros, CC BY-SA 3.0"],
    ["Parrot flower", "Impatiens psittacina", "mimic", "Myanmar and Thailand", "a flower shaped like a little flying parrot. people think it's photoshopped; it's real. this plate is from 1901.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/ImpatiensPsittacinaHooker.jpg/960px-ImpatiensPsittacinaHooker.jpg", "John Nugent Fitch, public domain"],
    ["Jade vine", "Strongylodon macrobotrys", "strange", "the Philippines", "claws of a turquoise no other flower has, hanging in long chains. pollinated by bats.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Strongylodon_macrobotrys%2C_Bagong_Silang%2C_Los_Ba%C3%B1os%2C_Laguna%2C_Philippines_1.jpg/960px-Strongylodon_macrobotrys%2C_Bagong_Silang%2C_Los_Ba%C3%B1os%2C_Laguna%2C_Philippines_1.jpg", "andrewholle, CC0"],
    ["Passion flower", "Passiflora", "strange", "the Americas", "Spanish missionaries saw the crucifixion in it (the crown of thorns, the nails, the wounds) and named it after the Passion.", "https://upload.wikimedia.org/wikipedia/commons/e/e5/OQ_Passion_flower.jpg", "Oliver P. Quillia, CC BY 3.0"],
    ["Darwin's slipper", "Calceolaria uniflora", "strange", "Patagonia and Tierra del Fuego", "the white 'tray' on its lip is a snack for a bird, which pollinates the flower while eating it.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d6/Calceolaria_uniflora.JPG/960px-Calceolaria_uniflora.JPG", "Thomas Mathis, CC BY-SA 3.0"],
    ["Window haworthia", "Haworthia cooperi", "mimic", "South Africa", "leaves like little glass beads; the clear tips let light in while the plant hides from the sun.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/1_Haworthia_cooperi_-_Kirstenbosch.jpg/960px-1_Haworthia_cooperi_-_Kirstenbosch.jpg", "Abu Shawka, CC0"],
    ["Staghorn fern", "Platycerium", "strange", "tropics of Africa, Asia and Australia", "lives on trees, not soil. antler-shaped fronds plus flat 'shield' fronds that collect falling leaves as compost.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/12/Platycerium_bifurcatum.jpg/960px-Platycerium_bifurcatum.jpg", "fir0002, GFDL 1.2"],
    ["Air plant", "Tillandsia", "strange", "the Americas", "needs no soil. tiny scales on the leaves drink water and food straight out of the air.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Tillandsia_fasciculata.jpg/960px-Tillandsia_fasciculata.jpg", "Hans Hillewaert, CC BY-SA 3.0"],
    ["Ant plant", "Dischidia", "strange", "Southeast Asia", "some species grow hollow balloon leaves that ants move into; the ants' waste feeds the plant.", "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/Dischidia-nummularia-SF24278-01.jpg/960px-Dischidia-nummularia-SF24278-01.jpg", "Steve Fitzgerald, CC BY-SA 4.0"]
  ];
  const KIND = {all: "everything", teratology: "growth accidents", ghost: "ghost plants", carrion: "carrion flowers", carnivore: "carnivores", mimic: "mimics & disguises", fossil: "living fossils", moves: "plants that move", strange: "just strange"};
  const KCOL = {teratology: "#e8432e", ghost: "#e6e1d3", carrion: "#9b2a3a", carnivore: "#58b368", mimic: "#f2c230", fossil: "#c49a6c", moves: "#3aa0e0", strange: "#9b7bd8"};
  document.body.insertAdjacentHTML("beforeend", `<div class="ov" id="garden30"><div class="g30wrap">
    <div class="l30head"><div><small>the museum · the weird garden</small><h2>plants that break the rules</h2></div><button class="bx" data-g30x>×</button></div>
    <p class="g30intro">when a plant grows wrong (flat, crested, flowers turning into leaves) botanists call it <b>teratology</b>: the study of monstrous forms. the crested ones are <b>fasciation</b>. leaves where petals should be is <b>phyllody</b>. the rest of this garden is plants that are strange on purpose: carrion flowers that smell like meat, ghost plants with no green, mimics, carnivores.</p>
    <div class="l30bar"><div class="l30pills">${Object.entries(KIND).map(([k, v]) => `<button class="pl30 ${k === "all" ? "on" : ""}" data-gk="${k}" style="--c:${KCOL[k] || "#fff"}">${esc(v)}</button>`).join("")}</div><button class="xp l30sh" data-g30sh>✦ a random weird one</button></div>
    <div class="g30grid" id="g30grid"></div>
    <div class="g30plates" id="g30plates"></div>
    <p class="mr30cred">photographs via Wikimedia Commons, credited on each plant. old plates: Ernst Haeckel and Maria Sibylla Merian, public domain.</p></div></div>
    <div class="pop30" id="plant30"><div class="p30box"><button class="bx" data-p30x>×</button><div id="p30in"></div></div></div>`);
  const GO = $("#garden30");
  let gK = "all";
  const paintGarden = () => {
    $("#g30grid").innerHTML = PLANTS.map((p, i) => [p, i]).filter(([p]) => gK === "all" || p[2] === gK).map(([p, i]) => `<button class="g30c" data-pi30="${i}" style="--c:${KCOL[p[2]]};--r:${(i * 37 % 9) - 4}deg"><span class="cut" style="--c:${KCOL[p[2]]}"><img src="${W(p[5], 500)}" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.parentNode.classList.add('noimg')"></span><b>${esc(p[0])}</b><small><i>${esc(p[1])}</i></small></button>`).join("");
    try { const pl = ["n0", "n1", "n2", "n3", "n4", "n5", "n6", "n7", "n8", "n9", "n10"].map(k => SPIMG[k]).filter(Boolean); $("#g30plates").innerHTML = pl.length ? `<h4>old plates from the archive</h4><div class="g30pl">${pl.map(s => `<img src="${s}" alt="" loading="lazy">`).join("")}</div>` : ""; } catch(_) {}
  };
  const openPlant = i => { const p = PLANTS[i]; if (!p) return;
    $("#p30in").innerHTML = `<div class="p30img" style="--c:${KCOL[p[2]]}"><img src="${W(p[5], 960)}" alt="" referrerpolicy="no-referrer" onerror="this.parentNode.classList.add('noimg')"></div><div class="p30txt"><small>${esc(KIND[p[2]])} · ${esc(p[3])}</small><h3>${esc(p[0])}</h3><p class="p30lat"><i>${esc(p[1])}</i></p><p>${esc(p[4])}</p>
      <div class="rhlinks"><a class="xp" href="https://en.wikipedia.org/w/index.php?search=${enc(p[1])}" target="_blank" rel="noopener">read more</a><a class="xp" href="https://www.inaturalist.org/taxa/search?q=${enc(p[1])}" target="_blank" rel="noopener">see where it grows (iNaturalist)</a><a class="xp" href="https://www.biodiversitylibrary.org/search?searchTerm=${enc(p[1])}" target="_blank" rel="noopener">old drawings (Biodiversity Heritage Library)</a><a class="xp" href="https://commons.wikimedia.org/w/index.php?search=${enc(p[1])}&title=Special:MediaSearch&type=image" target="_blank" rel="noopener">more photos</a></div>
      <div class="rhnext"><button class="rhn" data-p30n="-1">❮ previous</button><button class="rhn sh" data-g30sh>✦ another weird one</button><button class="rhn" data-p30n="1">next ❯</button></div><p class="g30c2">photo: ${esc(p[6])}, Wikimedia Commons</p><p class="rhsaved">✓ written in your journal</p></div>`;
    $("#plant30").dataset.i = i; $("#plant30").classList.add("open"); learn("plant", p[0] + " (" + p[1] + ")", p[4]); };
  function openGarden(){ closeOverlays(); paintGarden(); GO.classList.add("open"); }
  window.openGarden = openGarden;
  document.addEventListener("click", e => { const t = e.target;
    if (t.closest("[data-g30x]")) { GO.classList.remove("open"); return; }
    const k = t.closest("[data-gk]"); if (k) { gK = k.dataset.gk; GO.querySelectorAll("[data-gk]").forEach(b => b.classList.toggle("on", b === k)); paintGarden(); return; }
    const c = t.closest("[data-pi30]"); if (c) { openPlant(+c.dataset.pi30); return; }
    if (t.closest("[data-g30sh]")) { openPlant(Math.floor(Math.random() * PLANTS.length)); return; }
    const n = t.closest("[data-p30n]"); if (n) { openPlant((+$("#plant30").dataset.i + +n.dataset.p30n + PLANTS.length) % PLANTS.length); return; }
    if (t.closest("[data-p30x]") || t.id === "plant30") { $("#plant30").classList.remove("open"); return; }
  });

  /* ---------------- 6. the journal of things learned ---------------- */
  const KL = {sound: "sounds", plant: "plants", source: "sites & archives", aesthetic: "aesthetics", piece: "pieces", pocket: "pocketed"};
  document.body.insertAdjacentHTML("beforeend", `<div class="ov" id="learn30"><div class="j30wrap">
    <div class="l30head"><div><small>your notebook</small><h2>what you learned here</h2></div><button class="bx" data-j30x>×</button></div>
    <div id="j30stats" class="j30stats"></div>
    <div class="j30act"><button class="xp" data-j30exp="md">⬇ export as a document (.md)</button><button class="xp" data-j30exp="txt">⬇ plain text</button><button class="xp" data-j30print>🖨 print / save as PDF</button><button class="xp" data-j30clear>clear</button></div>
    <div id="j30list" class="j30list"></div></div></div>`);
  const JO = $("#learn30");
  const days = () => { const s = new Set(XS.learn.map(x => new Date(x.at).toDateString())); return s.size; };
  const streak = () => { let n = 0; const d = new Date(); const set = new Set(XS.learn.map(x => new Date(x.at).toDateString())); while (set.has(d.toDateString())) { n++; d.setDate(d.getDate() - 1); } return n; };
  const paintJ = () => {
    const L = XS.learn, by = {}; L.forEach(x => by[x.k] = (by[x.k] || 0) + 1);
    const uniq = new Set(L.map(x => x.k + x.t)).size;
    const deepest = Object.keys(RH).filter(g => L.some(x => x.k === "sound" && x.t === g)).length;
    $("#j30stats").innerHTML = `<div class="j30n"><b>${uniq}</b><small>things learned</small></div><div class="j30n"><b>${days()}</b><small>days exploring</small></div><div class="j30n"><b>${streak()}</b><small>day streak</small></div><div class="j30n"><b>${deepest}/${Object.keys(RH).length}</b><small>sound rabbit holes</small></div>` + Object.entries(by).map(([k, n]) => `<div class="j30n s"><b>${n}</b><small>${esc(KL[k] || k)}</small></div>`).join("");
    if (!L.length) { $("#j30list").innerHTML = `<p class="mrp">nothing yet. spin the wheel in the music room, open a plant in the weird garden, or step into a rabbit hole in the museum. everything you open lands here.</p>`; return; }
    const groups = {}; L.forEach(x => { const d = new Date(x.at).toLocaleDateString(undefined, {weekday: "long", day: "numeric", month: "long"}); (groups[d] = groups[d] || []).push(x); });
    $("#j30list").innerHTML = Object.entries(groups).map(([d, xs]) => `<h4>${esc(d)}</h4>${xs.map(x => `<div class="j30i"><span class="j30k k-${esc(x.k)}">${esc(KL[x.k] || x.k)}</span><b>${esc(x.t)}</b>${x.line ? `<p>${esc(x.line)}</p>` : ""}</div>`).join("")}`).join("");
  };
  const exportJ = (fmt) => {
    const L = XS.learn.slice().reverse(); const md = fmt === "md";
    let s = md ? `# what I learned on The Ghost of MSN\n\n_${new Date().toLocaleDateString()} · ${new Set(L.map(x => x.k + x.t)).size} things_\n\n` : `WHAT I LEARNED ON THE GHOST OF MSN\n${new Date().toLocaleDateString()}\n\n`;
    const groups = {}; L.forEach(x => { const d = new Date(x.at).toLocaleDateString(); (groups[d] = groups[d] || []).push(x); });
    Object.entries(groups).forEach(([d, xs]) => { s += md ? `## ${d}\n\n` : `${d}\n`; xs.forEach(x => { s += md ? `- **${x.t}** (${KL[x.k] || x.k})${x.line ? `: ${x.line}` : ""}\n` : `- ${x.t} [${KL[x.k] || x.k}]${x.line ? ` - ${x.line}` : ""}\n`; }); s += "\n"; });
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([s], {type: md ? "text/markdown" : "text/plain"})); a.download = "ghostofmsn-journal." + (md ? "md" : "txt"); document.body.appendChild(a); a.click(); a.remove();
  };
  window.openLearn = () => { closeOverlays(); paintJ(); JO.classList.add("open"); };
  document.addEventListener("click", e => { const t = e.target;
    if (t.closest("[data-j30x]")) { JO.classList.remove("open"); return; }
    const ex = t.closest("[data-j30exp]"); if (ex) { exportJ(ex.dataset.j30exp); return; }
    if (t.closest("[data-j30print]")) { document.body.classList.add("print30"); window.print(); setTimeout(() => document.body.classList.remove("print30"), 500); return; }
    if (t.closest("[data-j30clear]")) { if (confirm("clear your journal?")) { XS.learn = []; xsave(); paintJ(); } return; }
  });
  /* log what people open elsewhere */
  try { const _oa = window.openAesthetic; if (_oa) window.openAesthetic = function(n){ learn("aesthetic", n, ""); return _oa.apply(this, arguments); }; } catch(_) {}
  try { const _col = collect; collect = function(it){ try { learn("pocket", it.t || "something", it.line || ""); } catch(_) {} return _col.apply(this, arguments); }; } catch(_) {}
  /* doors in */
  const dr = $("#hudDrawer"); if (dr) dr.insertAdjacentHTML("afterbegin", `<button data-learn30>📓 what i learned</button><button data-garden30>✿ the weird garden</button><button data-links30>↗ rabbit holes</button>`);
  document.addEventListener("click", e => { if (e.target.closest("[data-learn30]")) window.openLearn(); if (e.target.closest("[data-garden30]")) openGarden(); if (e.target.closest("[data-links30]")) openLinks(); });
  try { VERT.forEach(v => { if (v.id === "explore") { v.p.push(["garden30", "✿", "the weird garden", "ghost plants, carrion flowers, growth accidents"]); v.p.push(["learn30", "📓", "what i learned", "your journal, exportable"]); } }); const _gp = goPlace; goPlace = function(k){ if (k === "garden30") return openGarden(); if (k === "learn30") return window.openLearn(); if (k === "links30") return openLinks(); return _gp(k); }; const _ot = openThing; openThing = function(k){ if (k === "garden30") return openGarden(); if (k === "learn30") return window.openLearn(); return _ot(k); }; } catch(_) {}

  /* ---------------- 7. group chat: everyone as a scanned, coloured cut-out ---------------- */
  const gcM = $("#gcM");
  if (gcM) {
    const W2 = $("#gchat .gcwrap");
    W2.insertAdjacentHTML("afterbegin", `<div class="gc30wall" id="gc30wall"></div>`);
    const paintWall = () => {
      const tiles = [...gcM.querySelectorAll(".gcm:not(.add)")];
      tiles.forEach((t, i) => t.style.setProperty("--c", COLS[i % COLS.length]));
      const me = XS.myPhoto;
      $("#gc30wall").innerHTML = tiles.map((t, i) => { const img = t.querySelector("img"); const n = t.querySelector("small"); return `<span class="gc30t" style="--c:${COLS[i % COLS.length]};--r:${(i * 41 % 11) - 5}deg">${img ? `<img src="${img.src}" alt="">` : `<i>${esc(n ? n.textContent[0] : "?")}</i>`}<b>${esc(n ? n.textContent : "")}</b></span>`; }).join("") +
        `<label class="gc30t me" style="--c:${COLS[(tiles.length) % COLS.length]};--r:3deg">${me ? `<img src="${me}" alt="">` : `<i>＋</i>`}<b>${me ? "you" : "add your photo"}</b><input type="file" accept="image/*" hidden id="gc30me"></label>`;
      const inp = $("#gc30me"); if (inp) inp.onchange = ev => { const f = ev.target.files[0]; if (!f) return; const im = new Image(); im.onload = () => { const c = document.createElement("canvas"); c.width = 160; c.height = 200; const s = Math.max(160 / im.width, 200 / im.height); const x = c.getContext("2d"); x.drawImage(im, (160 - im.width * s) / 2, (200 - im.height * s) / 2, im.width * s, im.height * s); XS.myPhoto = c.toDataURL("image/jpeg", .82); xsave(); try { myDP(); } catch(_) {} paintWall(); }; im.src = URL.createObjectURL(f); };
    };
    new MutationObserver(paintWall).observe(gcM, {childList: true});
    paintWall();
  }
})();

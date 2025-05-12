"use client";
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";

export default function CustomAudioPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const playingTrackRef = useRef<HTMLLIElement | null>(null);

  const playlist = useMemo(() => [

    //kolorab

    {
      title: "mahe ramzan by আঈনুদ্দীন আল আজাদ",
      src: "https://ia801405.us.archive.org/30/items/damama/mahe-ramzan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Hi Allah please help me by kalarab",
      src: "https://ia601205.us.archive.org/6/items/shopno/07-Hi-Allah-by-tawhid-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Din Bodoler Haoyay by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601201.us.archive.org/21/items/protibad/Din%20Bodoler%20Haoyay.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "bachar jonno aj lorte hobe by Abu Sufian Kalarab",
      src: "https://ia800303.us.archive.org/17/items/songhar/2.bachar-jonno-aj-lorte-hobe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Nobir Shohor Dur Modinar Valobasay",
      src: "https://ia802805.us.archive.org/27/items/klbsg2/Nobir-Shohor-Dur-Modinar-Valobasay.mp3",
      artist: "Sayduzzaman Nur",
      category: "kolorab"
    },
    {
      title: "ami chotto jodio shahosh boro by Kalarab",
      src: "https://ia601206.us.archive.org/35/items/prodip/Ami-chotto-jodio-shahos-boro.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Notun Vor by Elias Hasan",
      src: "https://ia600301.us.archive.org/24/items/nibedan/Notun%20Vor.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shadhinotake dekhechi bondhi by Abu Sufian Kalarab",
      src: "https://ia600500.us.archive.org/7/items/arnoy/Shadhinotake-dekhechi-bondhi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ami sei mukto manob by Abu Sufian Kalarab",
      src: "https://ia600500.us.archive.org/7/items/arnoy/Ami-sei-mukto-manob.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "rahmanur rahim allah boro meherban by kalarab",
      src: "https://ia801303.us.archive.org/3/items/hridoyjure/07.Rahmanur-rahim-by-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "bakbakum payragulo misti sure gay by kalarab",
      src: "https://ia601200.us.archive.org/3/items/madinarbulbuli/03.bakbakum-by-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Nil Doriyar Majhi by Iqbal Mahmud by Kalarab Shilpigosthi",
      src: "https://ia600603.us.archive.org/7/items/klbsg/Nil-Doriyar-Majhi-by-Iqbal-Mahmud.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "jibon jibon jibon niye by Badruzzaman Kalarab",
      src: "https://ia801200.us.archive.org/12/items/sonkitoshadhinota/jibon-jibon-jibon-niye.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Amar Mon Tori Vesheche by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Amar%20Mon%20Tori%20Vesheche.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "06.Nikab Sorao by Ainuddin Al Azad",
      src: "https://ia600105.us.archive.org/23/items/ronangon/0-06.Nikab-Sorao.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tala Al Badru Alayna by Hafiz Mizan",
      src: "https://ia600603.us.archive.org/7/items/klbsg/Tala-Al-Badru-Alayna.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "kalarab theme song (Album mugdho prohor) by Kalarab",
      src: "https://ia600502.us.archive.org/4/items/mugdhoprohor/Mughdho-prohor-album-theme-song.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Allah tumi koto mohan by Kalarab",
      src: "https://ia600502.us.archive.org/4/items/mugdhoprohor/Allah-tumi-koto-mohan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ami Je Tomar Banda Provu",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Ami-Je-Tomar-Banda-Provu.mp3",
      artist: "Shafin Ahmad, Tahsinul Islam, Shamim Ahmad, Shamim Arman &amp; Moshfiq",
      category: "kolorab"
    },
    {
      title: "Tumi Rahim Tumi Karim by Holy Tune Ft. Jaynal Abedin Ekatto",
      src: "https://ia800603.us.archive.org/7/items/klbsg/Tumi-Rahim-Tumi-Karim.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shadhinotake dekhechi bondhi by Abu Sufian Kalarab",
      src: "https://ia800500.us.archive.org/7/items/arnoy/Shadhinotake-dekhechi-bondhi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shukriya Janai Shukria (H Mahdi) by Hasan Mahdi Kalarab",
      src: "https://ia804608.us.archive.org/15/items/salliala/Shukriya-Janai-Shukria-H-Mahdi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "o batas amay tumi niye jaona by kalarab",
      src: "https://ia601202.us.archive.org/19/items/asholbari/10.O-Batas-Amay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "cholche tablige cholbe tablige by Badruzzaman Kalarab",
      src: "https://ia801200.us.archive.org/12/items/sonkitoshadhinota/cholche-tablige-cholbe-tablige.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "a jibon kar noyto amar by abu rayhan",
      src: "https://ia801300.us.archive.org/26/items/jedincholejabo/07-a-jibon-kar-by-abu-rayhan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Rahim Tumi Gafur Tumi by Iqbal Mahmud by Kalarab Shilpigosthi",
      src: "https://ia800603.us.archive.org/7/items/klbsg/Rahim-Tumi-Gafur-Tumi-by-Iqbal-Mahmud.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "bissho muslim aj tomar pane by Kazi Aminul Islam",
      src: "https://ia800207.us.archive.org/9/items/ashboi/6.bissho-muslim-aj-tomar-pane.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Karo Moto Noy Tumi by Iqbal Mahmud, Mahfuzul Alam, Abu Rayhan, Nazrul Islam",
      src: "https://ia600603.us.archive.org/7/items/klbsg/Karo-Moto-Noy-Tumi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ekdin ei desh poradhin chilo by Kazi Aminul Islam",
      src: "https://ia800207.us.archive.org/9/items/ashboi/5.ekdin-ei-desh-poradhin-chilo.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Kobita by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Kobita.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "o modinar bulbuli tomar name by kalarab",
      src: "https://ia801200.us.archive.org/3/items/madinarbulbuli/01.Modinar-bulbuli-by-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Golap Nilam Gada Nilam by Abu Ubayda",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Golap-Nilam-Gada-Nilam.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shotto Neyer Pothe Cholte - Mohasongbad by Sayed Ahmad, Muhammad Badruzzaman, Yeasin Hayder &amp; Others",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Shotto-Neyer-Pothe-Cholte-Mohasongbad.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Hothat Kono Shondha Belay by Fakhrul Haque Kalarab",
      src: "https://ia804608.us.archive.org/15/items/salliala/Hothat-Kono-Shondha-Belay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Notun Vor by Elias Hasan",
      src: "https://ia600301.us.archive.org/24/items/nibedan/Notun%20Vor.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Brishti Vejha Matir Gondho by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601204.us.archive.org/6/items/pishpo/Brishti%20Vejha%20Matir%20Gondho.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "tomar sriti mago by Kalarab",
      src: "https://ia801206.us.archive.org/34/items/habibikalarab/tomar-sriti-mago.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ojotha tomay je dey gali by kalarab",
      src: "https://ia801207.us.archive.org/29/items/onuvobetumi/ojotha-tomay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Mar kheye ar bachbe koto by Abu Sufian Kalarab",
      src: "https://ia800500.us.archive.org/7/items/arnoy/Mar-kheye-ar-bachbe-koto.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Dara bornona at bodle jaw by Sayed Ahmad Kalarab",
      src: "https://ia601208.us.archive.org/31/items/bodlejaw/1.Dara-bornona-at-bodle-jaw.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ruchi o progotir somonnoy by Kalarab",
      src: "https://ia601206.us.archive.org/34/items/habibikalarab/ruchi-o-progotir-spmonnoy.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "prothom amar dhormo by Kalarab",
      src: "https://ia801206.us.archive.org/34/items/habibikalarab/prothom-amar-dhormo.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "album porichiti by Abu Sufian Kalarab",
      src: "https://ia800303.us.archive.org/17/items/songhar/13.Album-porichiti.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "He doyamoy doyar shagor by Kalarab",
      src: "https://ia800502.us.archive.org/4/items/mugdhoprohor/He-doyamoy-doyar-shagor.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Chena sur chena gan by Kalarab",
      src: "https://ia601208.us.archive.org/13/items/rimjhim1/Chena-sur-chena-gan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ei cheleta bejay kharap by kalarab",
      src: "https://ia801205.us.archive.org/6/items/shopno/04-Ai-chheleta-by%20tawhid.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tomra thako khub arame by kalarab",
      src: "https://ia601207.us.archive.org/29/items/onuvobetumi/tomra-thako-khub-arame.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Mago Tomar Chobi Aka by Jahid Hasan, Ahnaf Khalid, Fazle Elahi Sakib, Jihad Husain &amp; Oth",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Mago-Tomar-Chobi-Aka.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "mostofa mostofa Muhammad rasul by Kalarab",
      src: "https://ia801206.us.archive.org/35/items/prodip/Mustofa-muhammad(sw)rasul.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ayre Shishu Ayre by mahmud kalarab",
      src: "https://ia803100.us.archive.org/33/items/jetehobe/Ayre-Shishu-Ayre-Kishor.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Khoda Tumi Koto Valo by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Khoda%20Tumi%20Koto%20Valo.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "drishti moder zay zotodur by Kalarab",
      src: "https://ia601206.us.archive.org/34/items/habibikalarab/drishti-moder-zay-zotodur.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Somoytake Palte Dite by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601201.us.archive.org/21/items/protibad/Somoytake%20Palte%20Dite.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "amader khali hat daw vore daw by kalarab",
      src: "https://ia801303.us.archive.org/3/items/hridoyjure/12.amader-khali-hat-by-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "amader ei deshe by Abu Sufian Kalarab",
      src: "https://ia600303.us.archive.org/17/items/songhar/6.amader-ei-deshe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "amar moner shokol asha sheshto hobena by kalarab",
      src: "https://ia801200.us.archive.org/3/items/madinarbulbuli/07.amar-moner-by-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Kotota Moner Gohine - Muhammadun by Arif Arian (Kalarab)",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Kotota-Moner-Gohine-Muhammadun.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Allah tumi doyar badhon by Kalarab",
      src: "https://ia800502.us.archive.org/4/items/mugdhoprohor/Allah-tumi-doyar-badhon.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "doyar nobi rasule arabi by abu rayhan",
      src: "https://ia800500.us.archive.org/8/items/michejibon/1.Miche-Ei-Jibaner(Almodina.com).mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tala Al Badru Alayna",
      src: "https://ia902805.us.archive.org/27/items/klbsg2/Tala-Al-Badru-Alayna.mp3",
      artist: "Abu Rayhan &amp; Tawhid Jamil",
      category: "kolorab"
    },
    {
      title: "Somvabonar shopno niye (kalarab theme song) by kalarab",
      src: "https://ia800500.us.archive.org/7/items/arnoy/Somvabonar-shopno-niye.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Album Start Speech by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601204.us.archive.org/6/items/pishpo/Album%20Start%20Speech.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "08.Mayer Ador Sneho by kalarab",
      src: "https://ia601302.us.archive.org/3/items/AchinPakhi/08.Mayer-Ador-Sneho.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "akash zokhon kalo holo by Kalarab",
      src: "https://ia801206.us.archive.org/34/items/habibikalarab/akash-zokhon-kalo-holo.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Desh Premik Jonogon",
      src: "http://dl.almodina.com/mp3/Amra-Desh-Premik-Jonogon.mp3",
      artist: "Sayed Ahmad &amp; Others",
      category: "kolorab"
    },
    {
      title: "anta habibu robbi by Badruzzaman Kalarab",
      src: "https://ia801200.us.archive.org/12/items/sonkitoshadhinota/anta-habibu-robbi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "abar jodi dak ashe fer by Kazi Aminul Islam",
      src: "https://ia600207.us.archive.org/9/items/ashboi/8.abar-jodi-dak-ashe-fer.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ei Manush tumi manush hobe kobe by Kalarab",
      src: "https://ia801200.us.archive.org/11/items/jaago/4.Ei-manush-tumi-manush-hobe-kobe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Esona Allahr name gan gai by আঈনুদ্দীন আল আজাদ",
      src: "https://ia801405.us.archive.org/30/items/damama/Esona-Allahr-name-gan-gai.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Madina Madina by Tawhid Jamil by Kalarab Shilpigosthi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Madina-Madina-by-Tawhid-Jamil.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "e pothe cholte asbe badha jani by ainuddin al azad",
      src: "http://dl.almodina.com/mp3/e%20pothe%20cholte%20asbe%20badha%20jani.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Dukhini Bangladesh by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Dukhini%20Bangladesh.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "prothom amar dhormo by Kalarab",
      src: "https://ia601206.us.archive.org/34/items/habibikalarab/prothom-amar-dhormo.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Khutbah by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Khutbah.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "tomake pabo bole ogo nabi by Kalarab",
      src: "https://ia600200.us.archive.org/12/items/mohona/Tomake-pabo-bole-ogo-nabi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Koi Mahdir Soinnora - Rukhte Hobe Dajjal",
      src: "https://www.dropbox.com/s/m019963igtmaymv/Koi-Mahdir-Soinnora-Rukhte-Hobe-Dajjal.mp3",
      artist: "Sayed Ahmad &amp; Others",
      category: "kolorab"
    },
    {
      title: "Emon ekta gaye jabi kina tumi by Kalarab",
      src: "https://ia801205.us.archive.org/33/items/kashful/12.Emon-ekta-gaye-jabi-kina-tumi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Sabilillah zodi jante by Abu Sufian Kalarab",
      src: "https://ia800500.us.archive.org/7/items/arnoy/Sabilillah-zodi-jante.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "kalarab theme song (Album Habibi) by Kalarab",
      src: "https://ia801206.us.archive.org/34/items/habibikalarab/habibi-album-theme-song.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Oi chad shundor oi ful sundor by Kalarab",
      src: "https://ia601205.us.archive.org/33/items/kashful/9.Oi-chad-shundor-oi-ful-sundor.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "06.Pahad Sagor by kalarab",
      src: "https://ia801302.us.archive.org/3/items/AchinPakhi/06.Pahad-Sagor.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "din puraile pabinare ekti din by kalarab",
      src: "https://ia601202.us.archive.org/19/items/asholbari/03.Din-Puraile.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "09.Oi Je Akash by Ainuddin Al Azad",
      src: "https://ia800105.us.archive.org/23/items/ronangon/0-09.Oi-Je-Akash.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Desher jonno lorecho jara by Kalarab",
      src: "https://ia601200.us.archive.org/11/items/jaago/3.Desher-jonno-lorecho-jara.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Rongbironger duniyay by Kalarab",
      src: "https://ia800502.us.archive.org/4/items/mugdhoprohor/Rongbironger-duniyay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tomar Name Kokiler Shur by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Tomar%20Name%20Kokiler%20Shur.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ashbe provat katiye adhar by Kazi Aminul Islam",
      src: "https://ia600207.us.archive.org/9/items/ashboi/2.ashbe-provat-katiye-adhar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Vot Dio Tumi Vot Dio",
      src: "http://dl.almodina.com/mp3/Vot-Dio-Tumi-Vot-Dio.mp3",
      artist: "Muhammad Badruzzaman, Ahmod Abdullah, Arif Arian, Mahfuzul Alam, Abir Hasan &amp; Imranul Farhan",
      category: "kolorab"
    },
    {
      title: "jar rin kono din shodh hoyna by kalarab",
      src: "https://ia601200.us.archive.org/3/items/madinarbulbuli/11.jar-hrin-by-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Kobul kore naw by Kalarab",
      src: "https://ia801208.us.archive.org/13/items/rimjhim1/Kobul-kore-naw.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ei duniya Shukhe by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601207.us.archive.org/26/items/porosh/Ei%20duniya%20Shukhe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Salat Tomar Bondhu Porom by Kalarab Shilpigosthi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Salat-Tomar-Bondhu-Porom.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "mohona album song by Kalarab",
      src: "https://ia600200.us.archive.org/12/items/mohona/Dhara-bornona-Mohona.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ei prithibir alo batas by kalarab",
      src: "https://ia801202.us.archive.org/19/items/asholbari/12.Ei-Prithibir-Alo.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ei Duniyar Shukhe Voge",
      src: "https://ia802805.us.archive.org/27/items/klbsg2/Ei-Duniyar-Shukhe-Voge.mp3",
      artist: "Shamim Ahmad",
      category: "kolorab"
    },
    {
      title: "kokhon jani khachar pakhi ure gelo by kalarab",
      src: "https://ia801200.us.archive.org/3/items/madinarbulbuli/09.kokhon-jani-by-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "apon tumi vable jader by kalarab",
      src: "https://archive.org/download/shilpibolokare/Apon-tumi-vable-zader.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Dharabornona last by Kazi Aminul Islam",
      src: "https://ia800207.us.archive.org/9/items/ashboi/Dharabornona-last.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tumi Rahim Tumi Karim by Holy Tune Ft. Jaynal Abedin Ekatto",
      src: "https://ia800603.us.archive.org/7/items/klbsg/Tumi-Rahim-Tumi-Karim.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Kemon Kore Jacche Kete by Imtiaz Masrur Kalarab",
      src: "https://ia804608.us.archive.org/15/items/salliala/Kemon-Kore-Jacche-Kete.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Naw baiya gawre majhi by Kalarab",
      src: "https://ia601205.us.archive.org/33/items/kashful/6.Naw-baiya-gawre-majhi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Oparer Dak Ashar Age by Aminul Islam Mamun Kalarab",
      src: "https://ia804608.us.archive.org/15/items/salliala/Oparer-Dak-Ashar-Age.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shukria Janai Shukria (Tahsin) by Tahsinul Islam Kalarab",
      src: "https://ia804608.us.archive.org/15/items/salliala/Shukria-Janai-Shukria-Tahsin.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ogo Prano Priyo Nabi",
      src: "https://ia902805.us.archive.org/27/items/klbsg2/Ogo-Prano-Priyo-Nabi.mp3",
      artist: "Abu Ubayda",
      category: "kolorab"
    },
    {
      title: "it pathorer boddho ei nogore by Badruzzaman Kalarab",
      src: "https://ia601200.us.archive.org/12/items/sonkitoshadhinota/it-patjorer-boddho-ei-nogore.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "chute ay shahjalaler nirvik soinikera by ainuddin al azad",
      src: "https://ia601202.us.archive.org/0/items/kihobe/Chute-ay-shah-jalaler(Almodina.com).mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ya Rab by Sayed Ahmad - Allama Iqbal by Kalarab Shilpigosthi",
      src: "https://ia600603.us.archive.org/7/items/klbsg/Ya-Rab-by-Sayed-Ahmad-Allama-Iqbal.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "shesh prohore azaner sure by kalarab",
      src: "https://ia801303.us.archive.org/3/items/hridoyjure/09.Shesh-prohore-by-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Biplobi by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Biplobi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shohid namer oi fuler mala by আঈনুদ্দীন আল আজাদ",
      src: "http://dl.almodina.com/mp3/Shohid%20namer%20oi%20fuler%20mala.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "kon ba asay kisher neshay by kalarab",
      src: "https://ia801202.us.archive.org/19/items/asholbari/05.Kon-Ba-Asay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ek Nodi Rokto Periye",
      src: "http://dl.almodina.com/mp3/Ek-Nodi-Rokto-Periye.mp3",
      artist: "Abu Rayhan, Nazrul Islam, Husain Adnan, Mahfuzul Alam &amp; Tawhid Jamil",
      category: "kolorab"
    },
    {
      title: "anta habibu robbi by Badruzzaman Kalarab",
      src: "https://ia801200.us.archive.org/12/items/sonkitoshadhinota/anta-habibu-robbi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ogo Moder Doyal khoda by mahmud kalarab",
      src: "https://ia803100.us.archive.org/33/items/jetehobe/Ogo-Moder-Doyal.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Sukhe Dukhe Jope Sobai by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801201.us.archive.org/21/items/protibad/Sukhe%20Dukhe%20Jope%20Sobai.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Rongin Ei Prithibi Charite Hoibe (Sayed) by Sayed Kalarab",
      src: "https://ia801208.us.archive.org/31/items/bodlejaw/14.rongin-e-prithibi-charite-hoibe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Keu Kade Keu Hase by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Keu%20Kade%20Keu%20Hase.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Bertho diner shob itihash by Abu Sufian Kalarab",
      src: "https://ia800500.us.archive.org/7/items/arnoy/Bertho-diner-shob-itihash.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Chad tara groho robi srishti tomar shobi by kalarab",
      src: "https://ia801206.us.archive.org/3/items/ccsundor/Chad-tara-groho-robi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shopner pothe pothe by Kalarab",
      src: "https://ia801208.us.archive.org/13/items/rimjhim1/Shopner-pothe-pothe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Azaner shure ghum vange vore by kalarab",
      src: "https://ia601205.us.archive.org/6/items/shopno/10-Azaner-shure-by-tawhid-kalarab%20.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Somvabonar shopno niye (kalarab theme song) by kalarab",
      src: "https://ia800500.us.archive.org/7/items/arnoy/Somvabonar-shopno-niye.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "dekha zabena dhora zabena by Badruzzaman Kalarab",
      src: "https://ia601200.us.archive.org/12/items/sonkitoshadhinota/dekha-zabena-dhora-zabena.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Eito amar desh sonar bangladesh by kalarab",
      src: "https://ia801207.us.archive.org/29/items/onuvobetumi/eito-amar-desh.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Hridoyer alapone tomay daki by Kalarab",
      src: "https://ia801200.us.archive.org/4/items/prottasha/Hridoyer-alapone-tomay-daki.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shukriya Janai Shukria (H Mahdi) by Hasan Mahdi Kalarab",
      src: "https://ia804608.us.archive.org/15/items/salliala/Shukriya-Janai-Shukria-H-Mahdi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Jaite hoibe oi kobore by Ainuddin Al Azad",
      src: "https://ia800500.us.archive.org/7/items/koborpother/JAYTE-HOBE-OY-KOBORE.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "bondhu vule jeona kokhono by Ainuddin Al Azad",
      src: "https://ia801201.us.archive.org/20/items/bondu/Bondhu-vule-jeona-kokhono.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Kobor pother jatri tumi by Ainuddin Al Azad",
      src: "http://dl.almodina.com/mp3/Kobor%20pother%20jatri%20tumi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "moder kodom jeno thake obichol by kalarab",
      src: "https://ia801202.us.archive.org/19/items/asholbari/06.Moder-Kadam.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Sukhe Dukhe Jope Sobai by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801201.us.archive.org/21/items/protibad/Sukhe%20Dukhe%20Jope%20Sobai.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ei banglar mati ajo poripati by Kalarab",
      src: "https://ia601200.us.archive.org/4/items/prottasha/Ei-banglar-mati-ajo-poripati.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "kono pothe shanti nai by Badruzzaman Kalarab",
      src: "https://ia801200.us.archive.org/12/items/sonkitoshadhinota/kono-pothe-shanti-nai.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shohider Khun Likheche Otit by Aminul Islam Mamun &amp; Kalarab",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Shohider-Khun-Likheche-Otit.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "jindabad islami moulobad by আঈনুদ্দীন আল আজাদ",
      src: "https://ia801405.us.archive.org/30/items/damama/jindabad-islami-moulobad.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shondhar akash by Kalarab",
      src: "https://ia800502.us.archive.org/4/items/mugdhoprohor/Shondhar-akash.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ar Noy Ar Noy by Abu Sufian Kalarab",
      src: "https://ia800500.us.archive.org/7/items/arnoy/Ar-Noy-Ar-Noy.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Onuvober Govire Shunno Amar by Badruzzaman Kalarab",
      src: "https://ia804608.us.archive.org/15/items/salliala/Onuvober-Govire-Shunno-Amar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "jotobar mone pore tomake he rasul by abu rayhan",
      src: "https://ia800500.us.archive.org/8/items/michejibon/5.Jato-Bar-Mane-Pade(Almodina.com).mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tomar didar pawar ashay by Kalarab",
      src: "https://ia801205.us.archive.org/33/items/kashful/15.Tomar-didar-pawar-ashay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tara vora oi nil asman by kalarab",
      src: "https://ia601303.us.archive.org/3/items/hridoyjure/03.Tara-vora-by-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Every night and every day by kalarab",
      src: "https://ia801207.us.archive.org/29/items/onuvobetumi/avri-night.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "anta habibu robbi by Kalarab",
      src: "https://ia601206.us.archive.org/34/items/habibikalarab/anta-habibu-robbi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ami Bangladesh Amar Jonmo Ekattore by Habibur Rahman Misbah, Sayed Ahmad &amp; Muhammad Badruzzaman",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Ami-Bangladesh-Amar-Jonmo-Ekattore.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Rongin e prithibi charite hoibe(Ainuddin) by Kalarab Shilpi gosthi",
      src: "https://ia801200.us.archive.org/11/items/jaago/7.Rongin-e-prithibi-charite-hoibe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tomar name akash jure by Kalarab",
      src: "https://ia800502.us.archive.org/4/items/mugdhoprohor/Tomar-name-akash-jure.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ami chai na amon desh by www.almodina.com",
      src: "https://ia801200.us.archive.org/11/items/jaago/AmiChaiNaAmonDesh.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tomar name akash jure by Kalarab",
      src: "https://ia600502.us.archive.org/4/items/mugdhoprohor/Tomar-name-akash-jure.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Din Bijoyer Din Esheche by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601201.us.archive.org/21/items/protibad/Din%20Bijoyer%20Din%20Esheche.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "shongkhito shadhinota album theme song by Badruzzaman Kalarab",
      src: "https://ia601200.us.archive.org/12/items/sonkitoshadhinota/shongkhito-shadhinota.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Panjeri by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Panjeri.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ogo Nabi Tomake Ami by Hasan Nakib",
      src: "https://ia800603.us.archive.org/7/items/klbsg/Ogo-Nabi-Tomake-Ami.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ratjaga pkhira dake obirol by Kalarab",
      src: "https://ia801205.us.archive.org/33/items/kashful/3.Ratjaga-pkhira-dake-obirol.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "podda meghna jomunar tire by Ainuddin Al Azad",
      src: "https://ia801201.us.archive.org/20/items/bondu/Porda-meghna-jomunar-tire.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Je Dhoni Akash Theke by Aminul Islam Mamun &amp; Others Of Kalarab",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Je-Dhoni-Akash-Theke.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Bijoy nishan (ii) by Abu Sufian Kalarab",
      src: "https://ia600303.us.archive.org/17/items/songhar/8.bijoy-nishan-(ii).mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ghumhin rojoni kate ekaki by Abu Rayhan Kalarab",
      src: "https://ia801201.us.archive.org/1/items/prarthona/05.Ghumhin-rojoni-kate-ekati.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "shukria janai allah shukria janai tomay by abu rayhan",
      src: "https://ia601300.us.archive.org/26/items/jedincholejabo/04-shukria-by-abu-rayhan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Mitha kotha boliona oshot pothe choliona by kalarab",
      src: "https://ia601206.us.archive.org/3/items/ccsundor/Mitha-kotha-bolona.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Hasbi Rabbi Jallallah by Muhammad Badruzzaman",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Hasbi-Rabbi-Jallallah.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Hridoy Majhe Mala Gathi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Hridoy-Majhe-Mala-Gathi-Chonde-Ar-Gane.mp3",
      artist: "Mahfuzul Alam &amp; Tawhid Jamil",
      category: "kolorab"
    },
    {
      title: "Oshotto Protirodhe Aposhhin Neta by Muhammad Badruzzaman, Yeasin Haider, Omar Abdullah, Arif Arian,",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Oshotto-Protirodhe-Aposhhin-Neta.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "sondha tara by abu rayhan",
      src: "https://ia800500.us.archive.org/8/items/michejibon/3.Sandha-Tara(Almodina.com).mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shakkhatkar by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Shakkhatkar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Dhane vora gane vora amar e desh vai by kalarab",
      src: "https://ia601206.us.archive.org/3/items/ccsundor/Dhane-vora-gane-vora.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Sob keno aj elomelo bir mujahid kothay gelo by Kalarab",
      src: "https://ia801200.us.archive.org/11/items/jaago/14.Shob-keno-aj-elomelo-bir-mujahid.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Mere Allah tu karim he by Kalarab",
      src: "https://ia801200.us.archive.org/11/items/jaago/18.Mere-Allah-tu-karim-he.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ami tumi amra sobai by Kalarab",
      src: "https://ia801206.us.archive.org/34/items/habibikalarab/ami-tumi-amra-sobai.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "bangladeshi shokbarta by Abu Sufian Kalarab",
      src: "https://ia800303.us.archive.org/17/items/songhar/12.bangladeshi-shokbarta.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ajke Zoto Bondishalar Pinjire by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601201.us.archive.org/21/items/protibad/Ajke%20Zoto%20Bondishalar%20Pinjire.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Raznitir Agune Purche Manush by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801201.us.archive.org/21/items/protibad/Raznitir%20Agune%20Purche%20Manush.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Kivabe Tomare Koribo Shoron by Abu Rayhan Kalarab",
      src: "https://ia804608.us.archive.org/15/items/salliala/Kivabe-Tomare-Koribo-Shoron.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Kokhono Ki Tumi Vebe Dekhecho by Muhammad Badruzzaman",
      src: "https://ia800603.us.archive.org/7/items/klbsg/Kokhono-Ki-Tumi-Vebe-Dekhecho.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ami Kandi Nodir Ghate Boisha by Sayed Ahmad (Kalarab)",
      src: "https://ia801201.us.archive.org/21/items/protibad/Ami-Kandi-Nodir-Ghate-Boisha.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Lal Lal Rokto Srote by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Lal%20Lal%20Rokto%20Srote.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Apon Kare Vabo Tumi by Mahfuzul Alam by Kalarab Shilpigosthi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Apon-Kare-Vabo-Tumi-by-Mahfuzul-Alam.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "bangladeshi shokbarta by Abu Sufian Kalarab",
      src: "https://ia800303.us.archive.org/17/items/songhar/12.bangladeshi-shokbarta.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Allahr Deya Ei Surete by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Allahr%20Deya%20Ei%20Surete.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ei Sonchito rokter binimoye by Abu Sufian Kalarab",
      src: "https://ia600500.us.archive.org/7/items/arnoy/Ei-Sonchito-rokter-binimoye.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Album Start Speech by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601204.us.archive.org/6/items/pishpo/Album%20Start%20Speech.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Kromo Poton by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Kromo%20Poton.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "abar jodi dak ashe fer by Kazi Aminul Islam",
      src: "https://ia600207.us.archive.org/9/items/ashboi/8.abar-jodi-dak-ashe-fer.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Kromo Poton by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Kromo%20Poton.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tumi mabud doyar shagor by Ainuddin Al Azad",
      src: "http://dl.almodina.com/mp3/Tumi%20mabud%20doyar%20shagor.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Bismillah Bole Shuru Kori by Tahsin &amp; Shafian Kalarab",
      src: "https://ia904608.us.archive.org/15/items/salliala/Bismillah-Bole-Shuru-Kori.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "kichu rat ache by Badruzzaman Kalarab",
      src: "https://ia601200.us.archive.org/12/items/sonkitoshadhinota/kichu-rat-ache.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Kobita by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Kobita.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ma Amar Akhi Faki Diye",
      src: "http://dl.almodina.com/mp3/Amar-Akhi-Faki-Diye-Ma-Giyeche.mp3",
      artist: "Saeed Usman",
      category: "kolorab"
    },
    {
      title: "gache gache tomar name by Kalarab",
      src: "https://ia801206.us.archive.org/34/items/habibikalarab/gache-gache-tomar-name.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Labbaik Allahumma Labbaik by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601201.us.archive.org/21/items/protibad/Labbaik%20Allahumma%20Labbaik.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "eso neyer jhanda hate niye by kalarab",
      src: "https://ia801202.us.archive.org/19/items/asholbari/09.Eso-Neyer-Janda.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Allahu Allahu by Kalarab",
      src: "https://ia801206.us.archive.org/34/items/habibikalarab/Allahu-Allahu.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Jagre Jag Bir Muslim by Kalarab Shilpigosthi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Jagre-Jagre-Bir-Muslim.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tobo Chobi Ei Hridoye Aki by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801204.us.archive.org/6/items/pishpo/Tobo%20Chobi%20Ei%20Hridoye%20Aki.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ogo jhor tumi tufaner rup niye by kalarab",
      src: "https://ia801203.us.archive.org/29/items/shilpibolokare/Ogo-jhor-tumi-tufaner-rup-niye.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ronangoner Chithi by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Ronangoner%20Chithi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "jibon jibon jibon niye by Badruzzaman Kalarab",
      src: "https://ia601200.us.archive.org/12/items/sonkitoshadhinota/jibon-jibon-jibon-niye.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Podma meghna jomunar tire(Ainuddin+Galib) by Ainuddin &amp; Galib",
      src: "https://ia801200.us.archive.org/11/items/jaago/PodmaMeghnaalmodina.com.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Malikre Vulia by Badruzzaman by Kalarab Shilpigosthi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Malikre-Vulia-by-Badruzzaman.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Amra Eshechi by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Amra%20Eshechi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tomar amar valobasha ke by Kalarab",
      src: "https://ia801205.us.archive.org/33/items/kashful/2.Tomar-amar-valobasha-ke.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ogo rahim ogo karim doyari sagor by kalarab",
      src: "https://ia601202.us.archive.org/19/items/asholbari/11.O-Go-Rahim.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ekkhane Bhalobasha Ekkhane Ghrina by Yasir Arafat Mamun",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Ekkhane-Bhalobasha-Ekkhane-Grina.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Dukhini Bangladesh by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Dukhini%20Bangladesh.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "dristi moder zay zoto dur by abu rayhan",
      src: "https://ia600500.us.archive.org/8/items/michejibon/2.Dristi-Moder(Almodina.com).mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "moru shaharar buke ogo bristi by kalarab",
      src: "https://ia601303.us.archive.org/3/items/hridoyjure/04.Moru-shahara.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ajker sopnota ektu rongin by Abu Rayhan Kalarab",
      src: "https://ia601201.us.archive.org/1/items/prarthona/11.Ajker-shopnota-ektu-rongin.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Jagre Jag Bir Muslim by Kalarab Shilpigosthi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Jagre-Jagre-Bir-Muslim.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Salam - Assalamu Alaikum by Zahid, Zihad, Sakib, Ahnaf Khalid &amp; Galib",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Salam-Assalamu-Alaikum.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tomar Dorud Buker Majhe by Sayduzzaman Nur by Kalarab Shilpigosthi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Tomar-Dorud-Buker-Majhe-by-Sayduzzaman-Nur.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Emon Jibon Koro Gothon by Abu Rayhan",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Emon-Jibon-Koro-Gothon.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "03.Amar Ee Gan by kalarab",
      src: "https://ia801302.us.archive.org/3/items/AchinPakhi/03.Amar-Ee-Gan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Oi cader dike takiy dekho by Abu Rayhan Kalarab",
      src: "https://ia801201.us.archive.org/1/items/prarthona/8.chader-dike-takiye-dekho.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Bertho diner shob itihash by Abu Sufian Kalarab",
      src: "https://ia800500.us.archive.org/7/items/arnoy/Bertho-diner-shob-itihash.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "akasher taragulo jodi nive jay by Kalarab",
      src: "https://ia801206.us.archive.org/35/items/prodip/Akasher-taragulo-jodi-nive-jay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "kono pothe shanti nai by Badruzzaman Kalarab",
      src: "https://ia801200.us.archive.org/12/items/sonkitoshadhinota/kono-pothe-shanti-nai.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "aj ekhane kal ki hobe by ainuddin al azad",
      src: "http://dl.almodina.com/mp3/aj%20ekhane%20kal%20ki%20hobe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Charidike Eto Khun - Jege Utho Muslim",
      src: "https://ia802805.us.archive.org/27/items/klbsg2/Charidike-Eto-Khun-Jege-Utho-Muslim.mp3",
      artist: "Muhammad Badruzzaman, Ahmod Abdullah, Omar Abdullah, Arif Arian, Mahfuzul Alam &amp; Others",
      category: "kolorab"
    },
    {
      title: "Bodle Jaw Bodle Daw by Sayed Ahmad Kalarab",
      src: "https://ia801208.us.archive.org/31/items/bodlejaw/2.Matha-tulo-awaz-uthao.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ek desh ek potaka by Badruzzaman Kalarab",
      src: "https://ia601200.us.archive.org/12/items/sonkitoshadhinota/ek%20desh%20ek%20potaka.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Allah Rasulke Vuila Gele by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801204.us.archive.org/6/items/pishpo/Allah%20Rasulke%20Vuila%20Gele.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Album start speech by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Album%20start%20speech.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Prothome Allah Allah by Iqbal Mahmud &amp; Mahfuzul Alam",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Prothome-Allah-Allah.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "miche e jiboner rong dhonuta by abu rayhan",
      src: "https://ia600500.us.archive.org/8/items/michejibon/1.Miche-Ei-Jibaner(Almodina.com).mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "somoy esheche ebar dipto shopoth nebar by Kalarab",
      src: "https://ia601200.us.archive.org/11/items/jaago/12.Shomoy-esheche-ebar-dipto-shopoth.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Jibone Thakbe Har Jhit by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601207.us.archive.org/26/items/porosh/Jibone%20Thakbe%20Har%20Jhit.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Elo Khushir Barat Niye Shobe Borat by Jahid Hasan, Fazle Elahi Sakib, Jihadul Islam, Ahnaf Khalid &amp; As",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Elo-Khushir-Barat-Niye-Shobe-Borat.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Jokhon keu chilona by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Zokhon%20keu%20chilona.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "E Hridoye Uthe Biroho Jala",
      src: "https://ia802805.us.archive.org/27/items/klbsg2/E-Hridoye-Uthe-Biroho-Jala.mp3",
      artist: "Abu Bokar Atik, Faruq Tahir, Amadur Rahman",
      category: "kolorab"
    },
    {
      title: "Labbaik Allahumma Labbaik by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801201.us.archive.org/21/items/protibad/Labbaik%20Allahumma%20Labbaik.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ami Chaina Emon Kore Bachte by Sayed Ahmad Kalarab",
      src: "https://ia801208.us.archive.org/31/items/bodlejaw/8.Ami-chaina-emon-kore-bachte.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "subhe sadik by আঈনুদ্দীন আল আজাদ",
      src: "https://ia601405.us.archive.org/30/items/damama/subhe-sadik.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Habibi ya rasulallah by Kalarab",
      src: "https://ia801205.us.archive.org/33/items/kashful/14.Habibi-ya-rasulallah.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Moner majhe shudhu ei bedhona by Kalarab",
      src: "https://ia601208.us.archive.org/13/items/rimjhim1/Moner-majhe-shudhu-ei-bedhona.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "sondhar tararagulo bole jay by Ainuddin Al Azad",
      src: "https://ia801201.us.archive.org/20/items/bondu/Shondhar-taragulo-bole-jay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Rongin prithibir rongin alo by Kalarab",
      src: "https://ia600502.us.archive.org/4/items/mugdhoprohor/Rongin-prithibir-rongin-alo.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Khoda Tumi Koto Valo by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601207.us.archive.org/26/items/porosh/Khoda%20Tumi%20Koto%20Valo.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "tulo shir mohabir tumi by Abu Sufian Kalarab",
      src: "https://ia600303.us.archive.org/17/items/songhar/9.tulo-shir-mohabir-tumi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ramjaner Dipto Alo Nao He Mumin by Sayed Bin Shafiq, Ataullah Fayezi, HM Habib &amp; Rakibul Islam Raf",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Ramjaner-Dipto-Alo-Nao-He-Mumin.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "vejal amader deshe by Abu Sufian Kalarab",
      src: "https://ia600303.us.archive.org/17/items/songhar/1.vejal-amader-deshe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Allahar valobasa pete hole by mahfuz",
      src: "https://ia801205.us.archive.org/6/items/shopno/09-Allahar-valo-by-mahfuz-kalarab%20.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "shomvabonar agami shonali shudin by Kazi Aminul Islam",
      src: "https://ia600207.us.archive.org/9/items/ashboi/1.shomvabonar-agami-shonali-shudin.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Lal Lal Rokto Srote by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601207.us.archive.org/26/items/porosh/Lal%20Lal%20Rokto%20Srote.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Morme amar nache bhishon by Kalarab",
      src: "https://ia801200.us.archive.org/11/items/jaago/1.Morme-amar-nache-bhishon.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Batashe Lasher Gondho by Elias Hasan",
      src: "https://ia600301.us.archive.org/24/items/nibedan/Batashe%20Lasher%20Gondho.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Allah Tumi Mohan Malik by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601207.us.archive.org/26/items/porosh/Allah%20Tumi%20Mohan%20Malik.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "osot anondota anondhonoy by Kalarab",
      src: "https://ia600502.us.archive.org/4/items/mugdhoprohor/Osot-anondota-anondho-noy.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Monta Kare Debo Bolo by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801204.us.archive.org/6/items/pishpo/Monta%20Kare%20Debo%20Bolo.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Hridoyer Gohin Bone by Muhammad Badruzzaman",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Hridoyer-Gohin-Bone.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Allahr Zomine Allahr Mononito.mp3 by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801201.us.archive.org/21/items/protibad/Allahr%20Zomine%20Allahr%20Mononito.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "koto chonde koto anonde by Kalarab",
      src: "https://ia800200.us.archive.org/12/items/mohona/Koto-chonde-koto-anonde.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Dusshomoyer Jhor Jabe Theme by Ahmod Abdullah",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Dusshomoyer-Jhor-Jabe-Theme.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Prothome Allah Allah by Iqbal Mahmud &amp; Mahfuzul Alam",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Prothome-Allah-Allah.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "01.Ay Muzahid by Ainuddin Al Azad",
      src: "https://ia800105.us.archive.org/23/items/ronangon/0-01.Ay-Muzahid.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Brishtir jhum jhum shobdhe by Kalarab",
      src: "https://ia801208.us.archive.org/13/items/rimjhim1/Brishtir-jhum-jhum-shobdhe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Majhe majhe mon cay hoye jai deshdrohi by Kalarab",
      src: "https://ia601200.us.archive.org/11/items/jaago/16.Majhe-majhe-mon-chay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "The Mercy Of Allah",
      src: "https://ia802805.us.archive.org/27/items/klbsg2/The-Mercy-Of-Allah.mp3",
      artist: "Hasan Mahadi",
      category: "kolorab"
    },
    {
      title: "Olikhito March by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Olikhito%20March.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tomar Dorud Buker Majhe by Sayduzzaman Nur by Kalarab Shilpigosthi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Tomar-Dorud-Buker-Majhe-by-Sayduzzaman-Nur.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Jonmo Niyontron Kora Haram by Sayed Ahmad Kalarab",
      src: "https://ia801208.us.archive.org/31/items/bodlejaw/7.Jonmo-niyontron-kora-haram.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Manusher Chawa Pawa Dukher by Sayed Ahmad Kalarab",
      src: "https://ia801208.us.archive.org/31/items/bodlejaw/9.Manusher-chawa-pawa.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "kalarab theme song (Album mugdho prohor) by Kalarab",
      src: "https://ia800502.us.archive.org/4/items/mugdhoprohor/Mughdho-prohor-album-theme-song.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ami jedin chole jabo thakbe shudhu by abu rayhan",
      src: "https://ia801300.us.archive.org/26/items/jedincholejabo/11-ami-jedin-by-abu-rayhan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Akasher rongdhonu shat rang saje by Abu Rayhan Kalarab",
      src: "https://ia601201.us.archive.org/1/items/prarthona/2.Akasher-Rongdhonu.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Podda nodir majhi vaire by kalarab",
      src: "https://ia801207.us.archive.org/29/items/onuvobetumi/podda-nodir-majhi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Valobashi Tomake",
      src: "http://dl.almodina.com/mp3/Valobashi-Tomake-He-Priyo-Nabi.mp3",
      artist: "Sayed Ahmad &amp; Others",
      category: "kolorab"
    },
    {
      title: "Rasul namer chad utheche by Kalarab",
      src: "https://ia601205.us.archive.org/33/items/kashful/7.Rasul-namer-chad-utheche.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ami sei mukto manob by Abu Sufian Kalarab",
      src: "https://ia600500.us.archive.org/7/items/arnoy/Ami-sei-mukto-manob.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Album start speech by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601207.us.archive.org/26/items/porosh/Album%20start%20speech.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "banglar ghore ghore by Kazi Aminul Islam",
      src: "https://ia800207.us.archive.org/9/items/ashboi/3.banglar-ghore-ghore.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "dane lash baye lash by Abu Sufian Kalarab",
      src: "https://ia800303.us.archive.org/17/items/songhar/7.dane-lash-baye-lash.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "12.Jibane Pabe Ki by Ainuddin Al Azad",
      src: "https://ia600105.us.archive.org/23/items/ronangon/0-12.Jibane-Pabe-Ki.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "tomar sriti mago by Kalarab",
      src: "https://ia601206.us.archive.org/34/items/habibikalarab/tomar-sriti-mago.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ki hobe Vabte Oshru Jhore by KM Rafiqullah Rafi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Ki-hobe-Vabte-Oshru-Jhore.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "He doyamoy doyar shagor by Kalarab",
      src: "https://ia800502.us.archive.org/4/items/mugdhoprohor/He-doyamoy-doyar-shagor.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Abar Iman Ano by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Abar%20Iman%20Ano.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "As Subhu Bada Min by Hasan Mahadi &amp; Muhammad Badruzzaman",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/As-Subhu-Bada-Min.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ashay ashay jonom gelo khoda by Ainuddin Al Azad",
      src: "https://ia800500.us.archive.org/7/items/koborpother/ASAY-ASAY-JONOM.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "mayer kotha mone hole by kalarab",
      src: "https://ia801207.us.archive.org/29/items/onuvobetumi/mayer-kotha.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ami Joto Nalish Janai Khoda by Abu Rayhan",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Ami-Joto-Nalish-Janai-Khoda.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Rat Bidaye Fozor Sheshe by Omar Abdullah Kalarab",
      src: "https://ia904608.us.archive.org/15/items/salliala/Rat-Bidaye-Fozor-Sheshe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Az ami kal tumi evabe chole zabo by Kalarab",
      src: "https://ia801205.us.archive.org/33/items/kashful/10.Az-ami-kal-tumi-evabe-chole-zabo.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Miti miti tara jole by Kalarab",
      src: "https://ia600502.us.archive.org/4/items/mugdhoprohor/Miti-miti-tara-jole.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ami tumi amra sobai by Kalarab",
      src: "https://ia801206.us.archive.org/34/items/habibikalarab/ami-tumi-amra-sobai.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "chorke chor bola by Abu Sufian Kalarab",
      src: "https://ia800303.us.archive.org/17/items/songhar/3.chorke-chor-bola.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "kar tulite prithibita sobuj shemol by kalarab",
      src: "https://ia601207.us.archive.org/29/items/onuvobetumi/kar-tulite.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Amar Majhe Dawgo Tumi by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601204.us.archive.org/6/items/pishpo/Amar%20Majhe%20Dawgo%20Tumi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "prithibite Nam ache ekta by kalarab",
      src: "https://ia601202.us.archive.org/19/items/asholbari/07.Prithibite-Nam.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "hotashay nirashay by Kalarab",
      src: "https://ia801206.us.archive.org/34/items/habibikalarab/hotashay-nirashay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Buke Jader Jolche Onun by Fakhrul Haque",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Buke-Jader-Jolche-Onun.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "osot anondota anondhonoy by Kalarab",
      src: "https://ia800502.us.archive.org/4/items/mugdhoprohor/Osot-anondota-anondho-noy.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Rabbana ya rabbana by Kalarab",
      src: "https://ia601205.us.archive.org/33/items/kashful/1.Rabbana-ya-rabbana.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Beena by Elias Hasan",
      src: "https://ia600301.us.archive.org/24/items/nibedan/Beena.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Amar vallagena by Abu Sufian Kalarab",
      src: "https://ia800500.us.archive.org/7/items/arnoy/Amar-vallagena.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Eid Mubarak Eid Mubarak by Zahid, Sakib &amp; Khalid",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Eid-Mubarak-Eid-Mubarak.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ei duniya vangbe ekdin by Kalarab",
      src: "https://ia801206.us.archive.org/35/items/prodip/Ei-duniya-vangbe-ekdin.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "shagor shagor rokto hoyechi par by Kazi Aminul Islam",
      src: "https://ia800207.us.archive.org/9/items/ashboi/7.shagor-shagor-rokto-hoyechi-par.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ami Ashami He Mawla by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801201.us.archive.org/21/items/protibad/Ami%20Ashami%20He%20Mawla.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Protidan by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Protidan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Prithibite zahar kono hoyna tulona by kalarab",
      src: "https://ia801206.us.archive.org/3/items/ccsundor/Prithibi-te-jahar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Amra Eshechi by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Amra%20Eshechi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Album End Speech by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601201.us.archive.org/21/items/protibad/Tumi%20Amar%20Shiter%20Shokal.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Jibon Cholar Pothe Provu by Elias Amin",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Jibon-Cholar-Pothe-Provu.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shondha Tara Jole Dur Nilimay by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801204.us.archive.org/6/items/pishpo/Shondha%20Tara%20Jole%20Dur%20Nilimay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Khomotar Loraita Cholcheto Cholche by Sayed Ahmad Kalarab",
      src: "https://ia801208.us.archive.org/31/items/bodlejaw/3.Khomotar-loraita-cholcheto.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Majh Shagore Thikanahin Khaddobihin by Kalarab Shilpigosthi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Majh-Shagore-Thikanahin-Khaddobihin.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ei Prithibir Akash Mati by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801201.us.archive.org/21/items/protibad/Ei%20Prithibir%20Akash%20Mati.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Jiboner sob caoya puron hobe by Abu Rayhan Kalarab",
      src: "https://ia801201.us.archive.org/1/items/prarthona/4.Jiboner-shob-chawa.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Khutbah by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Khutbah.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ki darun e desher shroter rup by Kalarab",
      src: "https://ia601206.us.archive.org/35/items/prodip/Ki-darun-edesher-shoroter-rup.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "10.Prithibir Dike Ami by Ainuddin Al Azad",
      src: "https://ia600105.us.archive.org/23/items/ronangon/0-10.Prithibir-Dike-Ami.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "voy nai ore kono voy nai by kalarab",
      src: "https://ia601203.us.archive.org/29/items/shilpibolokare/Voy-nai-ore-kono-voy-nai.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Vobe aisha furti koira by Kalarab",
      src: "https://ia801200.us.archive.org/4/items/prottasha/Bhobe-aisha-purti-koira.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Kobor Pother Jatri Tumi by Husain Adnan ft. Ainuddin Al Azad",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Kobor-Pother-Jatri-Tumi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "E kemon Desh Amar by Muhammad Badruzzaman",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/E-kemon-Desh-Amar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ki hobe beche theke by ainuddin al azad",
      src: "http://dl.almodina.com/mp3/ki%20hobe%20beche%20theke.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ai Jibone Kichhui by mahmud kalarab",
      src: "https://ia903100.us.archive.org/33/items/jetehobe/Ai-Jibone-Kichhui.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Purnima chad jemon alo haray by Kalarab",
      src: "https://ia801205.us.archive.org/33/items/kashful/11.Purnima-chad-jemon-alo-haray.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ahlan Sahlan Marhaban Ya Ramadan",
      src: "https://www.dropbox.com/s/y4gn9xb2u9ww1jf/Ahlan-Sahlan-Marhaban-Ya-Ramadan.mp3",
      artist: "Muhammad Badruzzaman &amp; Abu Rayhan",
      category: "kolorab"
    },
    {
      title: "Egiye Cholo Tumi by Sayed Ahmad (Kalarab)",
      src: "https://ia801201.us.archive.org/21/items/protibad/Egiye-Cholo-Tumi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Gari Tomar Bari Tomar by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Gari%20Tomar%20Bari%20Tomar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Oi Chad Suruj Ar Tarakaraji by Salman Sadi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Oi-Chad-Suruj-Ar-Tarakaraji.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "04.Maran Jodi by kalarab",
      src: "https://ia801302.us.archive.org/3/items/AchinPakhi/04.Maran-Jodi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Koto Shukher Shopne Ami Chilam Bivor by Rayhan Faruk",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Koto-Shukher-Shopne-Ami-Chilam-Bivor.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Dusshomoyer Jhor Jabe Theme by Ahmod Abdullah",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Dusshomoyer-Jhor-Jabe-Theme.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "mon ude zay by Kalarab",
      src: "https://ia801206.us.archive.org/34/items/habibikalarab/mon-ude-zay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Hasbi Rabbi Jallallah - Tere Sadqe Me Aaqa by Tawhid Jamil",
      src: "https://ia600603.us.archive.org/7/items/klbsg/Hasbi-Rabbi-Jallallah-Tere-Sadqe-Me-Aaqa.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "shopno ranga vubon jure by Kalarab",
      src: "https://ia800200.us.archive.org/12/items/mohona/Shopno-ranga-vubon-jure.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "kaler shopoth moha kaler shopoth by ainuddin al azad",
      src: "http://dl.almodina.com/mp3/kaler%20shopoth%20moha%20kaler%20shopoth.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Amra malik amra sromik by Abu Sufian Kalarab",
      src: "https://ia800500.us.archive.org/7/items/arnoy/Amra-malik-amra-sromik.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "End Spece at Prarthona by Abu Rayhan Kalarab",
      src: "https://ia601201.us.archive.org/1/items/prarthona/14.Album-end-spece-at-Prarthona.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "gulap joba hasnahena rup dekhe by kalarab",
      src: "https://ia801200.us.archive.org/3/items/madinarbulbuli/08.gulap-joba-by-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Biplobi by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Biplobi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tini Kamliwala Nabi SalliAla by Nazrul Islam Kalarab",
      src: "https://ia904608.us.archive.org/15/items/salliala/Tini-Kamliwala-Nabi-SalliAla.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Josna rater nibir choyay by kalarab",
      src: "https://ia801207.us.archive.org/29/items/onuvobetumi/josna-rater.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Emon Jibon Koro Gothon by Abu Rayhan",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Emon-Jibon-Koro-Gothon.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Jatiyo Mohasomabesh by Sayed Ahmad, Muhammad Badruzzaman, Ahmod Abdullah Arif Arian, Ma",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Jatiyo-Mohasomabesh.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Allah tumi koto mohan by Kalarab",
      src: "https://ia800502.us.archive.org/4/items/mugdhoprohor/Allah-tumi-koto-mohan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Duyare aishache palki by Ainuddin Al Azad",
      src: "http://dl.almodina.com/mp3/Duyare%20aishache%20palki.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shakkhatkar by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Shakkhatkar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "gache gache tomar name by Kalarab",
      src: "https://ia801206.us.archive.org/34/items/habibikalarab/gache-gache-tomar-name.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Keu Kade Keu Hase by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Keu%20Kade%20Keu%20Hase.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "shes holo buji shon ayojon by Kalarab",
      src: "https://ia800200.us.archive.org/12/items/mohona/Shesh-holo-bujhi-shob-ayojon.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ei Oshanti Ghera Kalo Megher Fake by Imtiaz Masrur, Muhammad Badruzzaman, Abu Rayhan, Arif Arian, Mah",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Ei-Oshanti-Ghera-Kalo-Megher-Fake.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Biporjo E Desh Oshoni Songket by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801201.us.archive.org/21/items/protibad/Biporjo%20E%20Desh.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Afsos",
      src: "http://dl.almodina.com/mp3/Amrato-Nij-Ghorer-Vetor-Afsos.mp3",
      artist: "Ahmod Abdullah",
      category: "kolorab"
    },
    {
      title: "Icche Kore Roz Provate by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801204.us.archive.org/6/items/pishpo/Icche%20Kore%20Roz%20Provate.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Somoytake Palte Dite by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601201.us.archive.org/21/items/protibad/Somoytake%20Palte%20Dite.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Bochor Ghure Elo Rahmat Najater",
      src: "https://ia802805.us.archive.org/27/items/klbsg2/Bochor-Ghure-Elo-Rahmat-Najater.mp3",
      artist: "H Ahmed &amp; Shehzad",
      category: "kolorab"
    },
    {
      title: "ekoti kotha boli tomake by Abu Rayhan Kalarab",
      src: "https://ia801201.us.archive.org/1/items/prarthona/7.Ekti-kotha-boli-tomake.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Minare Minare Shuni by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Minate%20Minare%20Shuni.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Hasbi Rabbi Jallallah by Muhammad Badruzzaman",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Hasbi-Rabbi-Jallallah.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Sristi Joto Sobar Majhe",
      src: "https://ia902805.us.archive.org/27/items/klbsg2/Sristi-Joto-Sobar-Majhe.mp3",
      artist: "Sayduzzaman Nur, Arif Arian, Mahfuzul Alam, Imranul Farhan &amp; Tawhid Jamil",
      category: "kolorab"
    },
    {
      title: "Priyo Bangladesh Amar by Kalarab Shilpigosthi",
      src: "https://ia800603.us.archive.org/7/items/klbsg/Priyo-Bangladesh-Amar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Hate hart rekhe shamne cholo by Kalarab",
      src: "https://ia801200.us.archive.org/11/items/jaago/5.Hate-hat-rekhe-shamne-cholo.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Album End Speech by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801204.us.archive.org/6/items/pishpo/Album%20End%20Speech.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "album porichiti by Abu Sufian Kalarab",
      src: "https://ia800303.us.archive.org/17/items/songhar/13.Album-porichiti.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "du chokher ghum asena by Badruzzaman Kalarab",
      src: "https://ia601200.us.archive.org/12/items/sonkitoshadhinota/du-chokher-ghum-asena.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Trivuboner Priyo Muhammad by Abu Rayhan &amp; Mahfuzul Alam ft. Kazi Nazrul Islam",
      src: "https://ia800603.us.archive.org/7/items/klbsg/Trivuboner-Priyo-Muhammad.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Hothat Kono Shondha Belay by Fakhrul Haque Kalarab",
      src: "https://ia804608.us.archive.org/15/items/salliala/Hothat-Kono-Shondha-Belay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Batashe Lasher Gondho by Elias Hasan",
      src: "https://ia600301.us.archive.org/24/items/nibedan/Batashe%20Lasher%20Gondho.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "kalarab theme song (Album Habibi) by Kalarab",
      src: "https://ia801206.us.archive.org/34/items/habibikalarab/habibi-album-theme-song.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Bijoy nishan amrai tuli sur tuli amra by Kalarab",
      src: "https://ia601200.us.archive.org/11/items/jaago/10.Bijoy-nishan-amrai-tuli.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Kono Pothe Shanti Nai by Muhammad Badruzzaman",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Kono-Pothe-Shanti-Nai.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Lokkho tarar majhe by Kalarab",
      src: "https://ia600502.us.archive.org/4/items/mugdhoprohor/Lokkho-tarar-majhe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shara rat chokhe ghum chilona by Kalarab",
      src: "https://ia601208.us.archive.org/13/items/rimjhim1/Shara-rat%20chokhe-ghum-chilona.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Allahr Deya Ei Surete by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Allahr%20Deya%20Ei%20Surete.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "bolte paro kar tulite akash holo nil by kalarab",
      src: "https://ia801303.us.archive.org/3/items/hridoyjure/08.Bolte-paro-by-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "amar mon zete chay by Kalarab",
      src: "https://ia601206.us.archive.org/34/items/habibikalarab/amar-mon-zete-chay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tar Nei Tulona by Abu Rayhan &amp; Husain Adnan",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Tar-Nei-Tulona.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Bolo akash kar mohimay nilima choray by Abu Rayhan Kalarab",
      src: "https://ia601201.us.archive.org/1/items/prarthona/5.Bolo-akash-kar-mohimay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "papitapi bandha tomar by Badruzzaman Kalarab",
      src: "https://ia801200.us.archive.org/12/items/sonkitoshadhinota/papitapi-bandha-tomar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "shahidi chetana by www.almodina.com",
      src: "https://ia601405.us.archive.org/30/items/damama/shahidi-chetana.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "akash batash chad sitara by kalarab",
      src: "https://ia801203.us.archive.org/29/items/shilpibolokare/Akash-batash-chad-sitara.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "09.Oi Nil Akash by kalarab",
      src: "https://ia801302.us.archive.org/3/items/AchinPakhi/09.Oi-Nil-Akash.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Rahim Tumi Gafur Tumi by Iqbal Mahmud by Kalarab Shilpigosthi",
      src: "https://ia800603.us.archive.org/7/items/klbsg/Rahim-Tumi-Gafur-Tumi-by-Iqbal-Mahmud.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Nastikotar poton chai din islamer bijoy chai by Kalarab",
      src: "https://ia801200.us.archive.org/11/items/jaago/2.Nastikotar-poton-chai.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "muhammad ka rowza kareeba raha he by kalarab",
      src: "https://ia601300.us.archive.org/26/items/jedincholejabo/09-muhammad-by-abdur-rahim.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Amar Majhe Dawgo Tumi by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801204.us.archive.org/6/items/pishpo/Amar%20Majhe%20Dawgo%20Tumi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "it pathorer boddho ei nogore by Badruzzaman Kalarab",
      src: "https://ia601200.us.archive.org/12/items/sonkitoshadhinota/it-patjorer-boddho-ei-nogore.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shoyone shopone shudhu ma by kalarab",
      src: "https://ia801205.us.archive.org/6/items/shopno/06-Shoyone-ma-by-mahfuz-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ek fota rohomer bikhari ami by Kalarab",
      src: "https://ia801208.us.archive.org/13/items/rimjhim1/Ek-fota-rohomer-bikhari-ami.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "shahadater shopoth niye by আঈনুদ্দীন আল আজাদ",
      src: "https://ia801405.us.archive.org/30/items/damama/shahadater-shopoth-niye.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "modhu makha sei sure by Kalarab",
      src: "https://ia601206.us.archive.org/35/items/prodip/Modhu-makha-sei-sure.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "cholche tablige cholbe tablige by Badruzzaman Kalarab",
      src: "https://ia601200.us.archive.org/12/items/sonkitoshadhinota/cholche-tablige-cholbe-tablige.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "tomar bondhu upor tolay basha by Kalarab",
      src: "https://ia801206.us.archive.org/34/items/habibikalarab/tomar-bondhu-upor-tolay-basha.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Dharabornona at Prarthona by Abu Rayhan Kalarab",
      src: "https://ia601201.us.archive.org/1/items/prarthona/1.Dharabornona-at-Prarthona.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "SalliAla Muhammadin by Abu Rayhan Kalarab",
      src: "https://ia904608.us.archive.org/15/items/salliala/SalliAla-Muhammadin.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Akash hote morur buke by Kalarab",
      src: "https://ia800502.us.archive.org/4/items/mugdhoprohor/Akash-hote-morur-buke.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "duniar ei mayay pore by mahmud kalarab",
      src: "https://ia803100.us.archive.org/33/items/jetehobe/Duniar-Ei-Mayay-Pore.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "mon ude zay by Kalarab",
      src: "https://ia601206.us.archive.org/34/items/habibikalarab/mon-ude-zay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Jibon Cholar Pothe Provu by Elias Amin",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Jibon-Cholar-Pothe-Provu.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Dharabornona last by Kazi Aminul Islam",
      src: "https://ia800207.us.archive.org/9/items/ashboi/Dharabornona-last.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Jokhon keu chilona by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601207.us.archive.org/26/items/porosh/Zokhon%20keu%20chilona.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ya ilahi dile khali by Ainuddin Al Azad",
      src: "http://dl.almodina.com/mp3/Ya%20ilahi%20dile%20khali.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "01.Achin Pakhi by kalarab",
      src: "https://ia801302.us.archive.org/3/items/AchinPakhi/01.Achin-Pakhi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "groho robi chad sitara by abu rayhan",
      src: "https://ia801300.us.archive.org/26/items/jedincholejabo/03-groho-robi-by-abu-rayhan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tomake Pabo Bole by Muhammad Badruzzaman",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Tomake-Pabo-Bole.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Dharabornona 1st by Kazi Aminul Islam",
      src: "https://ia600207.us.archive.org/9/items/ashboi/Dharabornona-1st.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Album Start Speech by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Album%20Start%20Speech.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shothik disha chai by Kalarab",
      src: "https://ia801205.us.archive.org/33/items/kashful/4.Shothik-disha-chai.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Kichu sriti thake by Kalarab",
      src: "https://ia601208.us.archive.org/13/items/rimjhim1/Kichu-sriti-thake.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Hridoye Gorechi Tomar Premer Mehfil",
      src: "https://ia802805.us.archive.org/27/items/klbsg2/Hridoye-Gorechi-Tomar-Premer-Mehfil.mp3",
      artist: "Ahmod Abdullah &amp; Husain Adnan",
      category: "kolorab"
    },
    {
      title: "ei ki shonar desh amar by Badruzzaman Kalarab",
      src: "https://ia801200.us.archive.org/12/items/sonkitoshadhinota/ei-ki-shonar-desh-amar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Dhushon Koman Poribesh Bachan by Sayed Ahmad Kalarab",
      src: "https://ia801208.us.archive.org/31/items/bodlejaw/4.Dhushon-koman-poribesh-bachan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "tomar rohomer shishir konay by Ainuddin Al Azad",
      src: "https://ia601201.us.archive.org/20/items/bondu/Tomar-rohomer-shishir-konay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "nei ko kono asa by ainuddin al azad",
      src: "http://dl.almodina.com/mp3/nei%20ko%20kono%20asa.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ei gan geye ami provuke khuje pai by Ainuddin Al Azad",
      src: "https://ia801201.us.archive.org/20/items/bondu/Ei-gan-geye-ami-provuke-khuje-pai.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Teer Hara Ei Dheuer Shagor",
      src: "https://ia902805.us.archive.org/27/items/klbsg2/Teer-Hara-Ei-Dheuer-Shagor.mp3",
      artist: "Abu Rayhan, Dawod Anam, Husain Adnan, Elias Amin, Mahfuzul Alam, Hasan Mahadi, Fakhrul Haque &amp; Tawhid Jamil",
      category: "kolorab"
    },
    {
      title: "Tomar didar pawer ashay by kalarab",
      src: "https://ia601205.us.archive.org/6/items/shopno/01-Tomar-didar-by-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Hridoy jure tomari nam by kalarab",
      src: "https://ia601303.us.archive.org/3/items/hridoyjure/01.Hridoi-jure-by-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Qari Belayet Shaykhul Quran by Kalarab Shilpigosthi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Qari-Belayet-Shaykhul-Quran.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Biplobi jonota abar gorje uthbe by Kalarab",
      src: "https://ia601200.us.archive.org/11/items/jaago/11.Biplobo-jonota-abar-gorje-uthbe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tini Kamliwala Nabi SalliAla by Nazrul Islam Kalarab",
      src: "https://ia904608.us.archive.org/15/items/salliala/Tini-Kamliwala-Nabi-SalliAla.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "shomvabonar agami shonali shudin by Kazi Aminul Islam",
      src: "https://ia600207.us.archive.org/9/items/ashboi/1.shomvabonar-agami-shonali-shudin.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Jonme Hujur Lage by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Jonme%20Hujur%20Lage.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Rokte tomar namti by Kalarab",
      src: "https://ia801208.us.archive.org/13/items/rimjhim1/Rokte-tomar-namti.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Roktim Bornomala by Elias Hasan",
      src: "https://ia600301.us.archive.org/24/items/nibedan/Roktim%20Bornomala.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Nirob mone ami kedei jabo by Abu Rayhan Kalarab",
      src: "https://ia601201.us.archive.org/1/items/prarthona/10.Nirob-mone-ami-kede-jabo.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Miti miti tara jole by Kalarab",
      src: "https://ia800502.us.archive.org/4/items/mugdhoprohor/Miti-miti-tara-jole.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "shongkhito shadhinota album theme song by Badruzzaman Kalarab",
      src: "https://ia801200.us.archive.org/12/items/sonkitoshadhinota/shongkhito-shadhinota.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Kivabe Tomare Koribo Shoron by Abu Rayhan Kalarab",
      src: "https://ia804608.us.archive.org/15/items/salliala/Kivabe-Tomare-Koribo-Shoron.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Album End Speech by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Album%20End%20Speech.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ek allahy bisshashi banda jara by Badruzzaman Kalarab",
      src: "https://ia601200.us.archive.org/12/items/sonkitoshadhinota/ek-allahy-bisshashi-banda-jara.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "provu tumi konthe amar ektu sudha by abu rayhan",
      src: "https://ia801300.us.archive.org/26/items/jedincholejabo/08-provu-tumi-by-a-rayhan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Deke Nebe Jedin Amare by Abu Rayhan",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Deke-Nebe-Jedin-Amare.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Sabilillah zodi jante by Abu Sufian Kalarab",
      src: "https://ia800500.us.archive.org/7/items/arnoy/Sabilillah-zodi-jante.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ya Rab by Sayed Ahmad - Allama Iqbal by Kalarab Shilpigosthi",
      src: "https://ia600603.us.archive.org/7/items/klbsg/Ya-Rab-by-Sayed-Ahmad-Allama-Iqbal.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shukhe Dukhe Jope Sobai by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801204.us.archive.org/6/items/pishpo/Shukhe%20Dukhe%20Jope%20Sobai.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shukno E Moruvumite Daw Tomar Premer Jol by Abu Rayhan (Kalarab)",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Shukno-E-Moruvumite-Daw-Tomar-Premer-Jol.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "osohay ek banda ami by kalarab",
      src: "https://ia601203.us.archive.org/29/items/shilpibolokare/Oshohay-ek-banda-ami.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "bachar jonno aj lorte hobe by Abu Sufian Kalarab",
      src: "https://ia800303.us.archive.org/17/items/songhar/2.bachar-jonno-aj-lorte-hobe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "jete hobe full album by mahmud kalarab",
      src: "https://ia803100.us.archive.org/33/items/jetehobe/01.Jete-Hobe-Full-Album.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Provu Tumi Moder Gane by Habibullah Nur &amp; Saifullah Nur",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Provu-Tumi-Moder-Gane.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ashichen habibe khoda by আঈনুদ্দীন আল আজাদ",
      src: "https://ia801405.us.archive.org/30/items/damama/Ashichen-habibe-khoda.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Mar kheye ar bachbe koto by Abu Sufian Kalarab",
      src: "https://ia600500.us.archive.org/7/items/arnoy/Mar-kheye-ar-bachbe-koto.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Mon Matano Shimanay by Sayed Ahmad Kalarab",
      src: "https://ia801208.us.archive.org/31/items/bodlejaw/15.Mon-matano-shimanay-dristi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Gor Adare Alor Prodip Tumi by Kalarab",
      src: "https://ia801200.us.archive.org/4/items/prottasha/Ghor-adhare-alor-prodip-tumi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "07.Nirab Mane by Ainuddin Al Azad",
      src: "https://ia800105.us.archive.org/23/items/ronangon/0-07.Nirab-Mane.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "karo sathe dekha hole bolbe by kalarab",
      src: "https://ia801207.us.archive.org/29/items/onuvobetumi/karo-sathe-dekha-hole.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "eso bondhu sotter pothe by Ainuddin Al Azad",
      src: "https://ia801201.us.archive.org/20/items/bondu/Esho-bondu-sotter-pothe-kori-songram.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Kalo Jongshon",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Kromagoto-Sob-Bodle-Jacche-Sudhu.mp3",
      artist: "Aminul Islam Mamun",
      category: "kolorab"
    },
    {
      title: "ek desh ek potaka by Badruzzaman Kalarab",
      src: "https://ia801200.us.archive.org/12/items/sonkitoshadhinota/ek%20desh%20ek%20potaka.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tar Nei Tulona by Abu Rayhan &amp; Husain Adnan",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Tar-Nei-Tulona.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Gari Tomar Bari Tomar by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601207.us.archive.org/26/items/porosh/Gari%20Tomar%20Bari%20Tomar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Prem Kobita Likhi Ami by Yeasin Haider Kalarab",
      src: "https://ia904608.us.archive.org/15/items/salliala/Prem-Kobita-Likhi-Ami.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Sonali diner sei omar khalid by Kalarab",
      src: "https://ia601200.us.archive.org/11/items/jaago/17.Shonali-diner-sei-omar-khalid.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tala Al Badru Alayna",
      src: "https://ia902805.us.archive.org/27/items/klbsg2/Tala-Al-Badru-Alayna.mp3",
      artist: "Abu Rayhan &amp; Tawhid Jamil",
      category: "kolorab"
    },
    {
      title: "Ami Kandi Nodir Ghate Boisha by Sayed Ahmad (Kalarab)",
      src: "https://ia801201.us.archive.org/21/items/protibad/Ami-Kandi-Nodir-Ghate-Boisha.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "koto din rojoni jay by Kazi Aminul Islam",
      src: "https://ia600207.us.archive.org/9/items/ashboi/4.koto-din-rojoni-jay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Bijoy nishan (ii) by Abu Sufian Kalarab",
      src: "https://ia600303.us.archive.org/17/items/songhar/8.bijoy-nishan-(ii).mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "badshah tumi dhin o duniyar by Kalarab",
      src: "https://ia600200.us.archive.org/12/items/mohona/Badsha-tumi-din-o-duniyar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "O Mon majhi by Kalarab",
      src: "https://ia601208.us.archive.org/13/items/rimjhim1/O-Mon-majhi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "kobor pashe dariye ami by kalarab",
      src: "https://ia801203.us.archive.org/29/items/shilpibolokare/Kobor-pashe-dariye-amay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "palare pala zoldi pala by archive.org/download/kihobe/Palare-pala-joldi-pala(Almodina.com).MP3",
      src: "http://dl.almodina.com/mp3/palare%20pala%20zoldi%20pala.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shagorer Dheuyer Dolate by Kalarab Shilpigosthi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Shagorer-Dheuyer-Dolate.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ek allahy bisshashi banda jara by Badruzzaman Kalarab",
      src: "https://ia601200.us.archive.org/12/items/sonkitoshadhinota/ek-allahy-bisshashi-banda-jara.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Daw khoda ei buke by Kalarab",
      src: "https://ia801205.us.archive.org/33/items/kashful/8.Daw-khoda-ei-buke.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Malikre Vulia by Badruzzaman by Kalarab Shilpigosthi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Malikre-Vulia-by-Badruzzaman.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Dhum pan bish pan by Abu Sufian Kalarab",
      src: "https://ia800500.us.archive.org/7/items/arnoy/Dhum-pan-bish-pan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tomake Pabo Bole by Muhammad Badruzzaman",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Tomake-Pabo-Bole.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Album Start Speech by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Album%20Start%20Speech.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "08.Sahidi Maran Jadi by Ainuddin Al Azad",
      src: "https://ia800105.us.archive.org/23/items/ronangon/0-08.Sahidi-Maran-Jadi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ami valobashi akasher oi nil by Kalarab",
      src: "https://ia601206.us.archive.org/34/items/habibikalarab/ami-valobashi-akasher-oi-nil.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "hotashay nirashay by Kalarab",
      src: "https://ia801206.us.archive.org/34/items/habibikalarab/hotashay-nirashay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "O tui ei duniyar mayay by Ainuddin Al Azad",
      src: "https://ia800500.us.archive.org/7/items/koborpother/O-tui-ei-duniyar-mayay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Lokkho tarar majhe by Kalarab",
      src: "https://ia800502.us.archive.org/4/items/mugdhoprohor/Lokkho-tarar-majhe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ogo nabi dhenero chobi by kalarab",
      src: "https://ia601303.us.archive.org/3/items/hridoyjure/02.Ogo-nabi-by-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Protidan by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Protidan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Brishtir jhum jhum shobdhe by Kalarab",
      src: "https://ia601208.us.archive.org/13/items/rimjhim1/Brishtir-jhum-jhum-shobdhe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "chorke chor bola by Abu Sufian Kalarab",
      src: "https://ia800303.us.archive.org/17/items/songhar/3.chorke-chor-bola.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ayre Amar Moner Boner Pakhi by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Ayre%20Amar%20Moner%20Boner%20Pakhi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Cholo zai modinay by Abu Sufian Kalarab",
      src: "https://ia800500.us.archive.org/7/items/arnoy/Cholo-zai-modinay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Jibone Thakbe Har Jhit by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Jibone%20Thakbe%20Har%20Jhit.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ashbe provat katiye adhar by Kazi Aminul Islam",
      src: "https://ia600207.us.archive.org/9/items/ashboi/2.ashbe-provat-katiye-adhar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Rat Bidaye Fozor Sheshe by Omar Abdullah Kalarab",
      src: "https://ia904608.us.archive.org/15/items/salliala/Rat-Bidaye-Fozor-Sheshe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "du chokher ghum asena by Badruzzaman Kalarab",
      src: "https://ia601200.us.archive.org/12/items/sonkitoshadhinota/du-chokher-ghum-asena.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Rongbironger duniyay by Kalarab",
      src: "https://ia600502.us.archive.org/4/items/mugdhoprohor/Rongbironger-duniyay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "amader ei deshe by Abu Sufian Kalarab",
      src: "https://ia600303.us.archive.org/17/items/songhar/6.amader-ei-deshe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "03.Akasher Lakho Tara by Ainuddin Al Azad",
      src: "https://ia600105.us.archive.org/23/items/ronangon/0-03.Akasher-Lakho-Tara.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "edesh tomar amar by Abu Sufian Kalarab",
      src: "https://ia600303.us.archive.org/17/items/songhar/10.edesh-tomar-amar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Allahr Valobasa Pete Hole by Kalarab",
      src: "https://ia801200.us.archive.org/4/items/prottasha/Allahr-valobasha-pete-hole.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "maya ghera rongin prithibi by Kalarab",
      src: "https://ia800200.us.archive.org/12/items/mohona/Maya-ghera-rongin-prithibi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "07.Ami Ek Rastar by kalarab",
      src: "https://ia801302.us.archive.org/3/items/AchinPakhi/07.Ami-Ek-Rastar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Amrai gorbo se somaj abar by Abu Sufian Kalarab",
      src: "https://ia800500.us.archive.org/7/items/arnoy/Amrai-gorbo-se-somaj-abar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ei Sonchito rokter binimoye by Abu Sufian Kalarab",
      src: "https://ia800500.us.archive.org/7/items/arnoy/Ei-Sonchito-rokter-binimoye.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ajke Zoto Bondishalar Pinjire by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801201.us.archive.org/21/items/protibad/Ajke%20Zoto%20Bondishalar%20Pinjire.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "dekha zabena dhora zabena by Badruzzaman Kalarab",
      src: "https://ia601200.us.archive.org/12/items/sonkitoshadhinota/dekha-zabena-dhora-zabena.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "akash zokhon kalo holo by Kalarab",
      src: "https://ia801206.us.archive.org/34/items/habibikalarab/akash-zokhon-kalo-holo.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ainuddin al azad by Abu Sufian Kalarab",
      src: "https://ia800303.us.archive.org/17/items/songhar/11.ainuddin-al-azad.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ke gorechen akash mati by Kalarab",
      src: "https://ia601206.us.archive.org/34/items/habibikalarab/ke-gorechen-akash-mati.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "jago jago bondhu amar by Badruzzaman Kalarab",
      src: "https://ia801200.us.archive.org/12/items/sonkitoshadhinota/jago-jago-bondhu-amar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Raznitir Agune Purche Manush by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801201.us.archive.org/21/items/protibad/Raznitir%20Agune%20Purche%20Manush.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Biporjo E Desh Oshoni Songket by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801201.us.archive.org/21/items/protibad/Biporjo%20E%20Desh.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Dhin kayemer uchu nishane by Kalarab",
      src: "https://ia600502.us.archive.org/4/items/mugdhoprohor/Dhin-kayemer-uchu-nishane.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "jibon bazi rekhe by Badruzzaman Kalarab",
      src: "https://ia801200.us.archive.org/12/items/sonkitoshadhinota/jibon-bazi-rekhe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Majh Shagore Thikanahin Khaddobihin by Kalarab Shilpigosthi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Majh-Shagore-Thikanahin-Khaddobihin.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Nisshashe tobo nam by Kalarab",
      src: "https://ia601208.us.archive.org/13/items/rimjhim1/Nisshashe-tobo-nam.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Cholar Pothe Zodi Poth Vule Zai by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801201.us.archive.org/21/items/protibad/Cholar%20Pothe%20Zodi%20Poth%20Vule%20Zai.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "nod nodi gach pala sristi nanan by kalarab",
      src: "https://ia801202.us.archive.org/19/items/asholbari/02.Nad-Nadi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Din Bijoyer Din Esheche by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801201.us.archive.org/21/items/protibad/Din%20Bijoyer%20Din%20Esheche.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Fahsi Chai Nastikder Fasi Chai by Sayed Ahmad Kalarab",
      src: "https://ia801208.us.archive.org/31/items/bodlejaw/5.Fashi-chai-fashi-chai.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Bismillah Bole Shuru Kori by Tahsin &amp; Shafian Kalarab",
      src: "https://ia904608.us.archive.org/15/items/salliala/Bismillah-Bole-Shuru-Kori.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "podma meghna surma jomuna by kalarab",
      src: "https://ia801303.us.archive.org/3/items/hridoyjure/05.Podma-meghna-by-kazi-amin-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Madina Madina by Tawhid Jamil by Kalarab Shilpigosthi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Madina-Madina-by-Tawhid-Jamil.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Lako Jiboner binimoy by Kalarab",
      src: "https://ia801200.us.archive.org/4/items/prottasha/Lakho-jiboner-binimoye-orjito.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "mati hobe ashol bari by kalarab",
      src: "https://ia801200.us.archive.org/3/items/madinarbulbuli/10.mati-hobe-ashol-by-nazrul.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "banglar ghore ghore by Kazi Aminul Islam",
      src: "https://ia800207.us.archive.org/9/items/ashboi/3.banglar-ghore-ghore.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ar noy hotasha ar noy voy by Kalarab",
      src: "https://ia801200.us.archive.org/11/items/jaago/13.Ar-noy-hotasha-ar-noy-voy.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shes holo buji sob ayojon by Abu Rayhan Kalarab",
      src: "https://ia801201.us.archive.org/1/items/prarthona/13.Sesh-holo-buji-shob-ayojon.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "02.Khoniker A Jibon by Ainuddin Al Azad",
      src: "https://ia600105.us.archive.org/23/items/ronangon/0-02.Khoniker-A-Jibon.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ami khujechi tomay koto by Ainuddin Al Azad",
      src: "https://ia600500.us.archive.org/7/items/koborpother/ami-khujechi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Jodi Meghe Meghe Dheke jay by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601207.us.archive.org/26/items/porosh/Zodi%20Meghe%20Meghe%20Dheke%20Zay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ramzan Elo Ramzan Elo",
      src: "https://ia902805.us.archive.org/27/items/klbsg2/Ramzan-Elo-Ramzan-Elo.mp3",
      artist: "Jahid, Sakib, Galib, khalid, Mamun, Nasrullah &amp; Nayem",
      category: "kolorab"
    },
    {
      title: "ei ki shonar desh amar by Badruzzaman Kalarab",
      src: "https://ia601200.us.archive.org/12/items/sonkitoshadhinota/ei-ki-shonar-desh-amar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "amar mon zete chay by Kalarab",
      src: "https://ia801206.us.archive.org/34/items/habibikalarab/amar-mon-zete-chay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Allahr Zomine Allahr Mononito.mp3 by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601201.us.archive.org/21/items/protibad/Allahr%20Zomine%20Allahr%20Mononito.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ruchi o progotir somonnoye by Kalarab",
      src: "https://ia800502.us.archive.org/4/items/mugdhoprohor/Ruchi-o-progotir-somonnoye.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Din Bodoler Haoyay by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601201.us.archive.org/21/items/protibad/Din%20Bodoler%20Haoyay.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Kingbodonti by Elias Hasan",
      src: "https://ia600301.us.archive.org/24/items/nibedan/Kingbodonti.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "tomar name gan gahiya by kalarab",
      src: "https://ia601200.us.archive.org/3/items/madinarbulbuli/04.Tomar-name-gan-by-rayhan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "islam ache ar islam thakbei by Abu Sufian Kalarab",
      src: "https://ia800303.us.archive.org/17/items/songhar/5.islam-ache-ar-islam-thakbei.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tolabul elmi paridatun ala kulli muslimin by kalarab",
      src: "https://ia601205.us.archive.org/6/items/shopno/05-Talabul-elme-by-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "kichu rat ache by Badruzzaman Kalarab",
      src: "https://ia601200.us.archive.org/12/items/sonkitoshadhinota/kichu-rat-ache.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Nil Doriyar Majhi by Iqbal Mahmud by Kalarab Shilpigosthi",
      src: "https://ia600603.us.archive.org/7/items/klbsg/Nil-Doriyar-Majhi-by-Iqbal-Mahmud.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Album Start Speech by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601201.us.archive.org/21/items/protibad/Album%20Start%20Speech.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Beena by Elias Hasan",
      src: "https://ia600301.us.archive.org/24/items/nibedan/Beena.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Kaba Amar Kaba by Ahmod Abdullah",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Kaba-Amar-Kaba.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "allah tomari korunar nahi ogo shesh by Kalarab",
      src: "https://ia801206.us.archive.org/35/items/prodip/Allah-tomar-ei-korunar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "gopone gopone koro premer alapon by Kalarab",
      src: "https://ia600200.us.archive.org/12/items/mohona/Gopone-gopone-koro-premer-alapon.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Dhum pan bish pan by Abu Sufian Kalarab",
      src: "https://ia600500.us.archive.org/7/items/arnoy/Dhum-pan-bish-pan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "tulo shir mohabir tumi by Abu Sufian Kalarab",
      src: "https://ia600303.us.archive.org/17/items/songhar/9.tulo-shir-mohabir-tumi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Amra Mumin Amra Musolman by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801201.us.archive.org/21/items/protibad/Amra%20Mumin%20Amra%20Musolman.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Mago tomar asha zeno puron korte pari by kalarab",
      src: "https://ia801206.us.archive.org/3/items/ccsundor/Mago-tomar-asha.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tomar Name Kokiler Shur by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Tomar%20Name%20Kokiler%20Shur.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "jago muslim tumi jago by আঈনুদ্দীন আল আজাদ",
      src: "https://ia601405.us.archive.org/30/items/damama/jago-muslim-tumi-jago.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tomari Nam Jople",
      src: "https://ia902805.us.archive.org/27/items/klbsg2/Tomari-Nam-Jople.mp3",
      artist: "Humayun Kabir Azad",
      category: "kolorab"
    },
    {
      title: "Dio Jannat",
      src: "http://dl.almodina.com/mp3/Ghumiye-Poreche-Akash-Dio-Jannat.mp3",
      artist: "Husain Adnan",
      category: "kolorab"
    },
    {
      title: "Tomar Pother Pothik Jara",
      src: "https://ia902805.us.archive.org/27/items/klbsg2/Tomar-Pother-Pothik-Jara.mp3",
      artist: "Arif Arian",
      category: "kolorab"
    },
    {
      title: "Moner Majhe Tumi Acho Mishe by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801204.us.archive.org/6/items/pishpo/Moner%20Majhe%20Tumi%20Acho%20Mishe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "adhar rater jibon kheyay by ainuddin al azad",
      src: "http://dl.almodina.com/mp3/adhar%20rater%20jibon%20kheyay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shukria Janai Shukria (Tahsin) by Tahsinul Islam Kalarab",
      src: "https://ia804608.us.archive.org/15/items/salliala/Shukria-Janai-Shukria-Tahsin.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "rong dhonu ranga ei desher akash by kalarab",
      src: "https://ia601200.us.archive.org/3/items/madinarbulbuli/06.rong-dhonu-by-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Rongin prithibir rongin alo by Kalarab",
      src: "https://ia600502.us.archive.org/4/items/mugdhoprohor/Rongin-prithibir-rongin-alo.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Jodi Meghe Meghe Dheke jay by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Zodi%20Meghe%20Meghe%20Dheke%20Zay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ronangoner Chithi by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Ronangoner%20Chithi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shagorer Dheuyer Dolate by Kalarab Shilpigosthi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Shagorer-Dheuyer-Dolate.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Fire eso quraner alokito jiboner shondhane by Kalarab",
      src: "http://rchive.org/download/jaago/15.Jodi-mano-quran-allahr.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Kingbodonti by Elias Hasan",
      src: "https://ia600301.us.archive.org/24/items/nibedan/Kingbodonti.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "O pakhi tui jashre kothay by kalarab",
      src: "https://ia601205.us.archive.org/6/items/shopno/02-O%20pakhi%20by%20hosain%20kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Jonme Hujur Lage by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Jonme%20Hujur%20Lage.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ke gorechen akash mati by Kalarab",
      src: "https://ia801206.us.archive.org/34/items/habibikalarab/ke-gorechen-akash-mati.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tumi ki dekhona kanna tader by Kalarab",
      src: "https://ia601208.us.archive.org/13/items/rimjhim1/Tumi-ki-dekhona-kanna-tader.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Valo lage sokal bela pakhir dakadaki by kalarab",
      src: "https://ia601206.us.archive.org/3/items/ccsundor/Valo-lage-sokal-bela.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ruchi o progotir somonnoye by Kalarab",
      src: "https://ia800502.us.archive.org/4/items/mugdhoprohor/Ruchi-o-progotir-somonnoye.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Rasulullah - Rasule Khoda He by Abu Rayhan",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Rasulullah-Rasule-Khoda-He.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Agun Chilo by Elias Hasan",
      src: "https://ia600301.us.archive.org/24/items/nibedan/Agun%20Chilo.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shundor prithibi chere chole zete chayna e mon by kalarab",
      src: "https://ia801206.us.archive.org/3/items/ccsundor/Shundor-prithibi-chere.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Bishonnotay cheye geche hridoy by Kalarab",
      src: "https://ia801208.us.archive.org/13/items/rimjhim1/Bidhonnotay-cheye-geche-hridoy.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Jonogoner pawnadena thikmoto na hole by Kalarab",
      src: "https://ia801200.us.archive.org/11/items/jaago/8.Jonogoner-pawnadena-thikmoto-na-hole.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Album Start Speech by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601201.us.archive.org/21/items/protibad/Album%20Start%20Speech.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tala Al Badru Alayna by Hafiz Mizan",
      src: "https://ia600603.us.archive.org/7/items/klbsg/Tala-Al-Badru-Alayna.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Album End Speech by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Album%20End%20Speech.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Muttaqi Banado Ya Rabbana by Ahmod Abdullah",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Muttaqi-Banado-Ya-Rabbana.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Islami hukumot by আঈনুদ্দীন আল আজাদ",
      src: "https://ia801405.us.archive.org/30/items/damama/ISLAMI-HUKUMATH.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ek Allah bine karo kothay by kalarab",
      src: "https://ia801203.us.archive.org/29/items/shilpibolokare/Ek-Allah-bine-karo-kothay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tumi Amar Shiter Shokal by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801201.us.archive.org/21/items/protibad/Tumi%20Amar%20Shiter%20Shokal.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tobuo valo achi Besh by Kalarab",
      src: "https://ia801200.us.archive.org/4/items/prottasha/Tobuo-valo-achi-besh.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "srinkhola bahinir usrinkhol by Abu Sufian Kalarab",
      src: "https://ia800303.us.archive.org/17/items/songhar/4.srinkhola-bahinir-usrinkhol.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Buk vora shopner Nam shadhinata by Kalarab",
      src: "https://ia601200.us.archive.org/4/items/prottasha/Buk-vora-shopner-nam-shadinota.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Dhin kayemer uchu nishane by Kalarab",
      src: "https://ia800502.us.archive.org/4/items/mugdhoprohor/Dhin-kayemer-uchu-nishane.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Moroner Age Ekbar by Abir Mahmud by Kalarab Shilpigosthi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Moroner-Age-Ekbar-by-Abir-Mahmud.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "tar neyamoter shukriya kemne aday kori by Ainuddin Al Azad",
      src: "https://ia801201.us.archive.org/20/items/bondu/Tar-neyamoter-shukriya.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "nirvik kafelar ei ovazan by আঈনুদ্দীন আল আজাদ",
      src: "https://ia601405.us.archive.org/30/items/damama/nirvik-kafelar-ei-ovazan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "La Ilaha Illallah by Badruzzaman Kalarab",
      src: "https://ia804608.us.archive.org/15/items/salliala/La-Ilaha-Illallah.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Oparer Dak Ashar Age by Aminul Islam Mamun Kalarab",
      src: "https://ia804608.us.archive.org/15/items/salliala/Oparer-Dak-Ashar-Age.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Elo Rabiul Awal",
      src: "http://dl.almodina.com/mp3/Elo-Rabiul-Awal.mp3",
      artist: "Iqbal Mahmud",
      category: "kolorab"
    },
    {
      title: "Tomar Mukher Hashi Dekhe Ma by Humayon Kabir Azad",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Tomar-Mukher-Hashi-Dekhe-Ma.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Apon Kare Vabo Tumi by Mahfuzul Alam by Kalarab Shilpigosthi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Apon-Kare-Vabo-Tumi-by-Mahfuzul-Alam.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Agun Chilo by Elias Hasan",
      src: "https://ia600301.us.archive.org/24/items/nibedan/Agun%20Chilo.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "shoyone shopone shudhu ma by abu rayhan",
      src: "https://ia801300.us.archive.org/26/items/jedincholejabo/10-shoyone-ma-by-abu-rayhan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "edesh tomar amar by Abu Sufian Kalarab",
      src: "https://ia600303.us.archive.org/17/items/songhar/10.edesh-tomar-amar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Dharabornona 1st by Kazi Aminul Islam",
      src: "https://ia600207.us.archive.org/9/items/ashboi/Dharabornona-1st.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ami Ashami He Mawla by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601201.us.archive.org/21/items/protibad/Ami%20Ashami%20He%20Mawla.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ami Konthe Tulechi Tobo Nam by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801204.us.archive.org/6/items/pishpo/Ami%20Konthe%20Tulechi%20Tobo%20Nam.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "tora ayre chuTe ay by abu rayhan",
      src: "https://ia800500.us.archive.org/8/items/michejibon/6.Tora-Ayre-Chute-Ay(Almodina.com).mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ma tumi chole gecho amay chere by kalarab",
      src: "https://ia601205.us.archive.org/6/items/shopno/08-Ma-tumi-by-hosain-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ar Noy Hotasha",
      src: "http://dl.almodina.com/mp3/Ar-Noy-Hotasha-Ar-Noy-Voy-ii.mp3",
      artist: "Muhammad Badruzzaman",
      category: "kolorab"
    },
    {
      title: "Bishonnotay cheye geche hridoy by Kalarab",
      src: "https://ia601208.us.archive.org/13/items/rimjhim1/Bidhonnotay-cheye-geche-hridoy.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Chader cheye sundor amar Nabi by kalarab",
      src: "https://ia601206.us.archive.org/3/items/ccsundor/Chader-cheye-sundor.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Kemon Kore Jacche Kete by Imtiaz Masrur Kalarab",
      src: "https://ia804608.us.archive.org/15/items/salliala/Kemon-Kore-Jacche-Kete.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "tomar doyar nei kono shimana by kalarab",
      src: "https://ia601203.us.archive.org/29/items/shilpibolokare/Tomar-doyar-nei-kono-simana.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tomar name tomar gane by Kalarab",
      src: "https://ia601200.us.archive.org/4/items/prottasha/Tomar-name-tomar-gane.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "islam ache ar islam thakbei by Abu Sufian Kalarab",
      src: "https://ia800303.us.archive.org/17/items/songhar/5.islam-ache-ar-islam-thakbei.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shadhinota Tumi Ekti Potakar Jonmo",
      src: "https://ia802805.us.archive.org/27/items/klbsg2/Shadhinota-Tumi-Ekti-Potakar-Jonmo.mp3",
      artist: "Yeasin Hayder, Elias Amin, Mahfuzul Alam, Abir Hasan &amp; Salman Sadi",
      category: "kolorab"
    },
    {
      title: "Moner ghore dey uki dey by kalarab",
      src: "https://ia601206.us.archive.org/3/items/ccsundor/Moner-ghore-dey-uki.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Aj sommukhe nodi by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601207.us.archive.org/26/items/porosh/Aj%20sommukhe%20nodi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Keu Valo Na Baslo Tate - Allah Kafi by Mahbubur Rahman",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Keu-Valo-Na-Baslo-Tate-Allah-Kafi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ruchi o progotir somonnoy by Kalarab",
      src: "https://ia801208.us.archive.org/13/items/rimjhim1/Ruchi-o-progotir-somonnoy.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Allah tumi doyar badhon by Kalarab",
      src: "https://ia800502.us.archive.org/4/items/mugdhoprohor/Allah-tumi-doyar-badhon.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Nirapod Shorok Chai by Muhammad Badruzzaman, Ahmod Abdullah, Arif Arian, Mahfuzul Alam",
      src: "https://ia600603.us.archive.org/7/items/klbsg/Nirapod-Shorok-Chai.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Aj sommukhe nodi by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Aj%20sommukhe%20nodi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "jago jago bondhu amar by Badruzzaman Kalarab",
      src: "https://ia601200.us.archive.org/12/items/sonkitoshadhinota/jago-jago-bondhu-amar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ma Aminar Akhir Tara",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Ma-Aminar-Akhir-Tara-Amar-Nabi-Muhammad.mp3",
      artist: "Husain Adnan, Mahfuzul Alam &amp; Tawhid Jamil",
      category: "kolorab"
    },
    {
      title: "drishti moder zay zotodur by Kalarab",
      src: "https://ia601206.us.archive.org/34/items/habibikalarab/drishti-moder-zay-zotodur.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ami valobashi akasher oi nil by Kalarab",
      src: "https://ia801206.us.archive.org/34/items/habibikalarab/ami-valobashi-akasher-oi-nil.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "hridoy arshite koto kotha by Abu Rayhan Kalarab",
      src: "https://ia801201.us.archive.org/1/items/prarthona/9.Hridoy-arshite-koto-kotha.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ayre Amar Moner Boner Pakhi by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Ayre%20Amar%20Moner%20Boner%20Pakhi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Cholo zai modinay by Abu Sufian Kalarab",
      src: "https://ia800500.us.archive.org/7/items/arnoy/Cholo-zai-modinay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "kalarab theme song (Album rimjhim) by Kalarab",
      src: "https://ia601208.us.archive.org/13/items/rimjhim1/Rimjhim-album-theme-song.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Allah Allah Bolo Mukhe Mukhe by Sayed Ahmad, Muhammad Badruzzaman, Abu Rayhan, Iqbal Mahmud, Mah",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Allah-Allah-Bolo-Mukhe-Mukhe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "dane lash baye lash by Abu Sufian Kalarab",
      src: "https://ia800303.us.archive.org/17/items/songhar/7.dane-lash-baye-lash.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Mora Oshohay Deshe Bash Kori by Sayed Kalarab",
      src: "https://ia801208.us.archive.org/31/items/bodlejaw/13.Mora-oshohay-deshe-bash-kori.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Priyo Bangladesh Amar by Kalarab Shilpigosthi",
      src: "https://ia800603.us.archive.org/7/items/klbsg/Priyo-Bangladesh-Amar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Choddosho Bochorer Amra Ek Kafela by Ishak Hossain Ft. Abu Taher Misbah",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Choddosho-Bochorer-Amra-Ek-Kafela.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "jibon bazi rekhe by Badruzzaman Kalarab",
      src: "https://ia801200.us.archive.org/12/items/sonkitoshadhinota/jibon-bazi-rekhe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tumi Ki Parbe Sonar Deshta by Sayed Kalarab",
      src: "https://ia801208.us.archive.org/31/items/bodlejaw/12.Tumi-ki-parbe-sonar-deshta-gorte.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "SalliAla Muhammadin by Abu Rayhan Kalarab",
      src: "https://ia904608.us.archive.org/15/items/salliala/SalliAla-Muhammadin.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Akasher oi dur nil anginay by Kalarab",
      src: "https://ia801205.us.archive.org/33/items/kashful/5.Akasher-oi-dur-nil-anginay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Allah Tumi Mohan Malik by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601207.us.archive.org/26/items/porosh/Allah%20Tumi%20Mohan%20Malik.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shondha Tara Jole Dur Nilimay by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801204.us.archive.org/6/items/pishpo/Shondha%20Tara%20Jole%20Dur%20Nilimay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "baba tumi hariye gele koi by Kalarab",
      src: "https://ia800200.us.archive.org/12/items/mohona/Baba-tumi-hariye-gele-koi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Karo posh mas karo sorbonash by Kalarab",
      src: "https://ia801200.us.archive.org/11/items/jaago/6.Baro-mashe-hoy-ekti-bochor.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "vejal amader deshe by Abu Sufian Kalarab",
      src: "https://ia600303.us.archive.org/17/items/songhar/1.vejal-amader-deshe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ogo Nabi Tomake Ami by Hasan Nakib",
      src: "https://ia800603.us.archive.org/7/items/klbsg/Ogo-Nabi-Tomake-Ami.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Habibi ya rasulallah by Sayed by Kalarab Shilpi gosthi",
      src: "https://ia601205.us.archive.org/33/items/kashful/14.Habibi-ya-rasulallah.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "jodi likhte shuru kori by abu rayhan",
      src: "https://ia601300.us.archive.org/26/items/jedincholejabo/01-jodi-likhte-by-abu-rayhan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Jiboner Bake Bake Shunnota Ghera by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601204.us.archive.org/6/items/pishpo/Jiboner%20Bake%20Bake%20Shunnota%20Ghera.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Amra malik amra sromik by Abu Sufian Kalarab",
      src: "https://ia800500.us.archive.org/7/items/arnoy/Amra-malik-amra-sromik.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Bartal Hortal Jonopod Lale Lal by Sayed Ahmad Kalarab",
      src: "https://ia601208.us.archive.org/31/items/bodlejaw/6.Barotal-hortal-jonopod-lale-lal.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "shilpi bolo kare tumi by kalarab",
      src: "https://ia801203.us.archive.org/29/items/shilpibolokare/Shilpi-bolo-kare-tumi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ar Noy Ar Noy by Abu Sufian Kalarab",
      src: "https://ia800500.us.archive.org/7/items/arnoy/Ar-Noy-Ar-Noy.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ami Joto Nalish Janai Khoda by Abu Rayhan",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Ami-Joto-Nalish-Janai-Khoda.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "La Ilaha Illallah by Badruzzaman Kalarab",
      src: "https://ia804608.us.archive.org/15/items/salliala/La-Ilaha-Illallah.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "amra tomar obujh bandha by ainuddin al azad",
      src: "http://dl.almodina.com/mp3/amra%20tomar%20obujh%20bandha.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "11.Nadir Kache Prasna by Ainuddin Al Azad",
      src: "https://ia800105.us.archive.org/23/items/ronangon/0-11.Nadir-Kache-Prasna.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ke ke jabi oi madinay by kalarab",
      src: "https://ia601202.us.archive.org/19/items/asholbari/13.Ke-Ke-Jabi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "05.Nikhiler Chero by Ainuddin Al Azad",
      src: "https://ia600105.us.archive.org/23/items/ronangon/0-05.Nikhiler-Chero.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Hate hat rekhe esona bondhu by Kalarab",
      src: "https://ia800502.us.archive.org/4/items/mugdhoprohor/Hate-hat-rekhe-esona-bondhu.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "02.Jar Karunay by kalarab",
      src: "https://ia801302.us.archive.org/3/items/AchinPakhi/02.Jar-Karunay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ya syedi irhamlana by kalarab",
      src: "https://ia601200.us.archive.org/3/items/madinarbulbuli/05.ya-sayedi-by-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Album End Speech by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801201.us.archive.org/21/items/protibad/Tumi%20Amar%20Shiter%20Shokal.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tumi Amar Shiter Shokal by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601201.us.archive.org/21/items/protibad/Tumi%20Amar%20Shiter%20Shokal.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "aicho khali jaiba khali by abu rayhan",
      src: "https://ia601300.us.archive.org/26/items/jedincholejabo/06-aichho-khali-by-abu-rayhan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Cholar Pothe Zodi Poth Vule Zai by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801201.us.archive.org/21/items/protibad/Cholar%20Pothe%20Zodi%20Poth%20Vule%20Zai.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Amra Mumin Amra Musolman by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801201.us.archive.org/21/items/protibad/Amra%20Mumin%20Amra%20Musolman.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ei Prithibir Akash Mati by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801201.us.archive.org/21/items/protibad/Ei%20Prithibir%20Akash%20Mati.mp3.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ekdin tomar joubon purabe by abu rayhan",
      src: "https://ia600500.us.archive.org/8/items/michejibon/4.Ekdin-Tomar(Almodina.com).mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Khub Beshi Dure Noy Gram theke Zela by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601204.us.archive.org/6/items/pishpo/Khub%20Beshi%20Dure%20Noy%20Gram%20theke%20Zela.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Nobi Mor Poroshmoni",
      src: "http://dl.almodina.com/mp3/Nobi-Mor-Porosh-Moni-Nobi-Mor-Sonar-Khoni.mp3",
      artist: "Abu Rayhan and Mahfuzul Alam",
      category: "kolorab"
    },
    {
      title: "Akash hote morur buke by Kalarab",
      src: "https://ia600502.us.archive.org/4/items/mugdhoprohor/Akash-hote-morur-buke.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "05.Kar Lagiya Kando by kalarab",
      src: "https://ia801302.us.archive.org/3/items/AchinPakhi/05.Kar-Lagiya-Kando.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Panjeri by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Panjeri.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shohider Khun Likheche Otit by Aminul Islam Mamun &amp; Kalarab",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Shohider-Khun-Likheche-Otit.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "shokor guzar kori allah shob tomari dan by kalarab",
      src: "https://ia801200.us.archive.org/3/items/madinarbulbuli/02.shukur-guzar-by-nazrul.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "No Mor Terrorism",
      src: "https://ia802805.us.archive.org/27/items/klbsg2/No-Mor-Terrorism.mp3",
      artist: "Muhammad Badruzzaman, Yeasin Haider, Omar Abdullah, Husain Adnan, Arif Arian &amp; Others",
      category: "kolorab"
    },
    {
      title: "anta habibu robbi by Kalarab",
      src: "https://ia601206.us.archive.org/34/items/habibikalarab/anta-habibu-robbi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "koto din rojoni jay by Kazi Aminul Islam",
      src: "https://ia600207.us.archive.org/9/items/ashboi/4.koto-din-rojoni-jay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Gham Sukabar Age Pawna",
      src: "https://ia902805.us.archive.org/27/items/klbsg2/Gham-Sukabar-Age-Pawna.mp3",
      artist: "Muhammad Badruzzaman, Arif Arian, Mahfuzul Alam, Abir Hasan, Imranul Farhan &amp; Salman Sadi",
      category: "kolorab"
    },
    {
      title: "sokal belay aloro melay by abu rayhan",
      src: "https://ia601300.us.archive.org/26/items/jedincholejabo/02-sokal-bela-by-abu-rayhan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Jibon Baji Rekhe",
      src: "https://ia800603.us.archive.org/7/items/klbsg/Jibon-Baji-Rekhe-Soda-Neyer-Pothe.mp3",
      artist: "Muhammad Badruzzaman, Arif Arain, Mahfuzul Alam",
      category: "kolorab"
    },
    {
      title: "Prem Kobita Likhi Ami by Yeasin Haider Kalarab",
      src: "https://ia904608.us.archive.org/15/items/salliala/Prem-Kobita-Likhi-Ami.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "O Mon Ramjaner Oi Rojar Sheshe by Kalarab Ft. Kazi Nazrul Islam",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/O-Mon-Ramjaner-Oi-Rojar-Sheshe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ek niyome joloche suruj by Kalarab",
      src: "https://ia801206.us.archive.org/35/items/prodip/Ek-niyome-jolche-suruj.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Rabbana Ya Rabbana by Sayed Kalarab",
      src: "https://ia801205.us.archive.org/33/items/kashful/1.Rabbana-ya-rabbana.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "tomar bondhu upor tolay basha by Kalarab",
      src: "https://ia601206.us.archive.org/34/items/habibikalarab/tomar-bondhu-upor-tolay-basha.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Minare Minare Shuni by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601207.us.archive.org/26/items/porosh/Minate%20Minare%20Shuni.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Islam Sara Duniyar",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Islam-Sara-Duniyar-Proud-Of-Muslim.mp3",
      artist: "Muhammad Badruzzaman, Aminul Islam Mamun, Yeasin Hayder, Ahmod Abdullah &amp; Mahfuzul Alam",
      category: "kolorab"
    },
    {
      title: "Ogo Muslim Tumi Ghumiyona Ar by Aminul Islam Mamun",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Ogo-Muslim-Tumi-Ghumiyona-Ar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "E desh amar tulona hoyna jar by kalarab",
      src: "https://ia601206.us.archive.org/3/items/ccsundor/E-desh-amar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Tobo Chobi Ei Hridoye Aki by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601204.us.archive.org/6/items/pishpo/Tobo%20Chobi%20Ei%20Hridoye%20Aki.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Hate hat rekhe esona bondhu by Kalarab",
      src: "https://ia800502.us.archive.org/4/items/mugdhoprohor/Hate-hat-rekhe-esona-bondhu.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "mon ze amar royna ghore by abu rayhan",
      src: "https://ia800500.us.archive.org/8/items/michejibon/7.Man-Je%20Amar-Royna(Almodina.com).mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ruchi o progotir somonnoy by Kalarab",
      src: "https://ia801206.us.archive.org/34/items/habibikalarab/ruchi-o-progotir-spmonnoy.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "srinkhola bahinir usrinkhol by Abu Sufian Kalarab",
      src: "https://ia800303.us.archive.org/17/items/songhar/4.srinkhola-bahinir-usrinkhol.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "arakan kasmir afgane by ainuddin al azad",
      src: "http://dl.almodina.com/mp3/arakan%20kasmir%20afgane.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Rongin e prithibi charite hoibe by Kalarab",
      src: "https://ia601205.us.archive.org/33/items/kashful/13.Rongin-e-prithibi-charite-hoibe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Duniay Thaka Jabena",
      src: "http://dl.almodina.com/mp3/Thaka-Jabena-Duniyay-Thaka-Jabena.mp3",
      artist: "Imranul Farhan",
      category: "kolorab"
    },
    {
      title: "shagor shagor rokto hoyechi par by Kazi Aminul Islam",
      src: "https://ia800207.us.archive.org/9/items/ashboi/7.shagor-shagor-rokto-hoyechi-par.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "sob manusher sera manush by kalarab",
      src: "https://ia801202.us.archive.org/19/items/asholbari/08.Sab-Manuser.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "sopnopuri o sopnopuri by kalarab",
      src: "https://ia801203.us.archive.org/29/items/shilpibolokare/Shopnopuri-o-shopuri.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "papitapi bandha tomar by Badruzzaman Kalarab",
      src: "https://ia801200.us.archive.org/12/items/sonkitoshadhinota/papitapi-bandha-tomar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shukno E Moruvumite Daw Tomar Premer Jol by Abu Rayhan (Kalarab)",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Shukno-E-Moruvumite-Daw-Tomar-Premer-Jol.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "shah jalal ar shah poran by kalarab",
      src: "https://ia801303.us.archive.org/3/items/hridoyjure/06.Shah-jalal-by-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "bissho muslim aj tomar pane by Kazi Aminul Islam",
      src: "https://ia800207.us.archive.org/9/items/ashboi/6.bissho-muslim-aj-tomar-pane.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Allahu Allahu by Kalarab",
      src: "https://ia801206.us.archive.org/34/items/habibikalarab/Allahu-Allahu.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Onuvober Govire Shunno Amar by Badruzzaman Kalarab",
      src: "https://ia804608.us.archive.org/15/items/salliala/Onuvober-Govire-Shunno-Amar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Amar Mon Tori Vesheche by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601207.us.archive.org/26/items/porosh/Amar%20Mon%20Tori%20Vesheche.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ami Poth Hariye Fire Ashi Barebare by Muhammad Badruzzman",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Ami-Poth-Hariye-Fire-Ashi-Barebare.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Je Dhoni Akash Theke by Aminul Islam Mamun &amp; Others Of Kalarab",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Je-Dhoni-Akash-Theke.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Sonal Juger Sei Itihas by Kalarab",
      src: "https://ia801200.us.archive.org/4/items/prottasha/Sonali-juger-sei-itihas.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Jibon nodir pranto shimay by আঈনুদ্দীন আল আজাদ",
      src: "https://ia801405.us.archive.org/30/items/damama/JIBON-NODIR-PRANTO-shimay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "tomader majhe ami ke je chilam by Kalarab",
      src: "https://ia800200.us.archive.org/12/items/mohona/Tomader-majhe-ami-ke-je-chilam.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ei duniya Shukhe by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801207.us.archive.org/26/items/porosh/Ei%20duniya%20Shukhe.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Salat Tomar Bondhu Porom by Kalarab Shilpigosthi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Salat-Tomar-Bondhu-Porom.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Abar Iman Ano by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Abar%20Iman%20Ano.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ei Sobuze Dhaner Math by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801204.us.archive.org/6/items/pishpo/Ei%20Sobuze%20Dhaner%20Math.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shukhe Dukhe Jope Sobai by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia801204.us.archive.org/6/items/pishpo/Shukhe%20Dukhe%20Jope%20Sobai.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "robbana ya rabbana by Kalarab",
      src: "https://ia601206.us.archive.org/35/items/prodip/Robbana-ya-robbana.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ami je dike takai shudhu by Kalarab",
      src: "https://ia801206.us.archive.org/35/items/prodip/Ami-je-dike-takai-shudhu.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Egiye Cholo Tumi by Sayed Ahmad (Kalarab)",
      src: "https://ia801201.us.archive.org/21/items/protibad/Egiye-Cholo-Tumi.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Boro jodi hote chao choto hou tobe by kalarab",
      src: "https://ia801205.us.archive.org/6/items/shopno/03-Boro-jodi-by-mahfuz-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "ekdin ei desh poradhin chilo by Kazi Aminul Islam",
      src: "https://ia800207.us.archive.org/9/items/ashboi/5.ekdin-ei-desh-poradhin-chilo.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "koto din koto rat chole zay by ainuddin al azad",
      src: "http://dl.almodina.com/mp3/koto%20din%20koto%20rat%20chole%20zay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Roktim Bornomala by Elias Hasan",
      src: "https://ia600301.us.archive.org/24/items/nibedan/Roktim%20Bornomala.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Oshotto Protirodhe Aposhhin Neta by Muhammad Badruzzaman, Yeasin Haider, Omar Abdullah, Arif Arian,",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Oshotto-Protirodhe-Aposhhin-Neta.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Amar vallagena by Abu Sufian Kalarab",
      src: "https://ia800500.us.archive.org/7/items/arnoy/Amar-vallagena.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shes kotha kobe bolbo by Abu Rayhan Kalarab",
      src: "https://ia601201.us.archive.org/1/items/prarthona/3.Shesh-kotha-kobe-bolbo.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Album End Speech by কলরব শিল্পীগোষ্ঠী",
      src: "https://ia601204.us.archive.org/6/items/pishpo/Album%20End%20Speech.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Shondhar akash by Kalarab",
      src: "https://ia800502.us.archive.org/4/items/mugdhoprohor/Shondhar-akash.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Olikhito March by Elias Hasan",
      src: "https://ia800301.us.archive.org/24/items/nibedan/Olikhito%20March.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Chai Tomar Kotha Shudhu Bolte by Aminul Islam Mamun, Husain Adnan, Mahfuzul Alam, Tawhid jamil &amp;",
      src: "https://ia600603.us.archive.org/7/items/klbsg/Chai-Tomar-Kotha-Shudhu-Bolte.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Rongin ei prirhibi charite hoibe by Abu Rayhan Kalarab",
      src: "https://ia601201.us.archive.org/1/items/prarthona/12.Rongin-ei-prithibi-by-rayhan.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "sagor pahar jhorna dhara by kalarab",
      src: "https://ia601303.us.archive.org/3/items/hridoyjure/11.sagor-pahar-by-kalarab.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Nastikota nipat jak din islam jindabad by Kalarab",
      src: "https://ia801200.us.archive.org/11/items/jaago/9.Nastikota-nipat-jak-din-islam-jindabad.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Dhonno nari ma amina by kalarab",
      src: "https://ia601207.us.archive.org/29/items/onuvobetumi/dhonno-nari.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Amrai gorbo se somaj abar by Abu Sufian Kalarab",
      src: "https://ia800500.us.archive.org/7/items/arnoy/Amrai-gorbo-se-somaj-abar.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Madinar Prem Buke",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Madinar-Prem-Buke-Jomiye-Rakhi.mp3",
      artist: "Daud Anam",
      category: "kolorab"
    },
    {
      title: "ainuddin al azad by Abu Sufian Kalarab",
      src: "https://ia800303.us.archive.org/17/items/songhar/11.ainuddin-al-azad.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Moroner Age Ekbar by Abir Mahmud by Kalarab Shilpigosthi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Moroner-Age-Ekbar-by-Abir-Mahmud.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Dawna Aji Pran Vore",
      src: "https://ia802805.us.archive.org/27/items/klbsg2/Dawna-Aji-Pran-Vore-Tomar-Valobasay.mp3",
      artist: "Fakhrul Haque",
      category: "kolorab"
    },
    {
      title: "Qari Belayet Shaykhul Quran by Kalarab Shilpigosthi",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Qari-Belayet-Shaykhul-Quran.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Ya Mujiru Ya Mujiru by Ahmod Abdullah",
      src: "https://dn720006.ca.archive.org/0/items/klbsg/Ya-Mujiru-Ya-Mujiru.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "nijhum govir rate by Kalarab",
      src: "https://ia800200.us.archive.org/12/items/mohona/Nijhum-govir-rate.mp3",
      artist: "Unknown",
      category: "kolorab"
    },
    {
      title: "Din Ashe Din Jay Itihasher Patay by Sayed Ahmad Kalarab",
      src: "https://ia601208.us.archive.org/31/items/bodlejaw/10.Din-ashe-din-zay.mp3",
      artist: "Unknown",
      category: "kolorab"
    },







    //symom sylpi 




    {
      title: "Mago Tomay Dilam Kothay by Saimum Shilpigosthi",
      src: "https://ia801001.us.archive.org/5/items/anupranon/Mago-Tomay-Dilam-Kothay.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Nil Akashe Lokkho Tarar by Saimum Shilpigosthi",
      src: "https://ia800801.us.archive.org/0/items/tomakei/Nil-Akashe-Lokkho-Tarar.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Hajar Ronger Dukkho Bethay by Saimum Shilpigosthi",
      src: "https://ia600500.us.archive.org/17/items/saimumhawa/Hajar-Ronger-Dukkho-Bethay.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Golamir Biruddhe by Saimum Shilpigosthi",
      src: "https://ia801001.us.archive.org/5/items/anupranon/Golamir-Biruddhe.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Gahilo Allahu Bole Piu Piu Papia by Sohail Ahmed Khan - Saimum",
      src: "https://ia801004.us.archive.org/35/items/bismillah51/Gahilo-Allahu-Bole-Piu-Piu-Papia.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Pub Akashe Shurjo Heshe by Saimum Shilpigosthi",
      src: "https://ia801002.us.archive.org/24/items/sopnerdeshe/Pub-Akashe-Shurjo-Heshe.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Tumi Aral Pete by www.almodina.com",
      src: "https://ia803102.us.archive.org/13/items/allahke/Tumi-Aral-Pete.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Kamli Wala Peyara Nabi by Sohail Ahmed Khan - Saimum",
      src: "https://ia601004.us.archive.org/35/items/bismillah51/Kamli-Wala-Peyara-Nabi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Mahe Ramzan Elo Bochor Ghure by Saimum Shilpigosthi",
      src: "https://ia903100.us.archive.org/20/items/ramzanergan/Mahe-Ramzan-Elo-Bochor-Ghure.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Kolo Kolo Kore Ruper Nodi by Saimum Shilpigosthi",
      src: "https://ia800302.us.archive.org/9/items/rupernodi/Kolo-Kolo-Kore-Ruper-Nodi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Mon Theke Valobeshe by Saimum Shilpigosthi",
      src: "https://ia801002.us.archive.org/24/items/sopnerdeshe/Mon-Theke-Valobeshe.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ma Holo Santi Sukher by Saimum Shilpigosthi",
      src: "https://ia800302.us.archive.org/9/items/rupernodi/Ma-Holo-Santi-Sukher.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Name Tomar Modhu Ache by Saimum Shilpigosthi",
      src: "https://ia601006.us.archive.org/0/items/alorprova/Name-Tomar-Modhu-Ache.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "O Majhi Vai Pal Uraiya De by Didarul Islam - Saimum",
      src: "https://ia801005.us.archive.org/28/items/shopner/O-Majhi-Vai-Pal-Uraiya-De.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "My Mathor Is My by Saimum Shilpigosthi",
      src: "https://ia600302.us.archive.org/9/items/rupernodi/My-Mathor-Is-My.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Amma Bolen Ghor Chere Tui by Saimum Shilpigosthi",
      src: "https://ia801008.us.archive.org/23/items/skgan/Amma-Bolen-Ghor-Chere-Tui.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Allah Allah Subhanallah by www.almodina.com",
      src: "https://ia803102.us.archive.org/13/items/allahke/Allah-Allah-Subhanallah.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Duniyate Du Diner Vaber Karkhana by Shafiq Adnan - Saimum",
      src: "https://ia803106.us.archive.org/7/items/monmohajon/Duniyate-Du-Diner-Vaber-Karkhana.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "O Kokil Chana Amar Jodi by Saimum Shilpigosthi",
      src: "https://ia801002.us.archive.org/24/items/sopnerdeshe/O-Kokil-Chana-Amar-Jodi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Amra Enechi Shadhinota by Saimum Shilpigosthi",
      src: "https://ia802907.us.archive.org/26/items/kishordergan/Amra-Enechi-Shadhinota.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Hariye Geche Chelebela by Saimum Shilpigosthi",
      src: "https://ia800500.us.archive.org/17/items/saimumhawa/Hariye-Geche-Chelebela.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Bismillah Bismillah by Saimum Shilpigosthi",
      src: "https://ia801002.us.archive.org/15/items/uromegher/Bismillah-Bismillah.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Amar Shonar Bangla by Saimum Shilpigosthi",
      src: "https://ia801207.us.archive.org/32/items/monihar/Amar-Shonar-Bangla.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Kichu Kichu Kotha Ache by Saimum Shilpigosthi",
      src: "https://ia800800.us.archive.org/19/items/sopner/Kichu-Kichu-Kotha-Ache.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Hridoy Gohine Apon Kore by Saimum Shilpigosthi",
      src: "https://ia600302.us.archive.org/9/items/rupernodi/Hridoy-Gohine-Apon-Kore.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "O mon romjaner oi rojar sheshe by Saimum Shilpigosthi",
      src: "https://ia803101.us.archive.org/6/items/eidergan/O-mon-romjaner-oi-rojar-sheshe.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Aslo Fire Eider Khushi by Saimum &amp; Jagoron Shilpigosthi",
      src: "https://ia600603.us.archive.org/32/items/siyamergan/Aslo-Fire-Eider-Khushi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Brikkho Kalima Muche by Saimum &amp; Jagoron Shilpigosthi",
      src: "https://ia600603.us.archive.org/32/items/siyamergan/Brikkho-Kalima-Muche.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ma Holo Ek Shanti Shukher by Saimum Shilpigosthi",
      src: "https://ia801002.us.archive.org/24/items/sopnerdeshe/Ma-Holo-Ek-Shanti-Shukher.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Takbir Tolo Ek Allahr Name by Saimum Shilpigosthi",
      src: "https://ia800302.us.archive.org/9/items/rupernodi/Takbir-Tolo-Ek-Allahr-Name.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Namer Borai Koro Na Ko by Saimum Shilpigosthi",
      src: "https://ia800801.us.archive.org/0/items/tomakei/Namer-Borai-Koro-Na-Ko.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Dharabornona Start by Saimum Shilpigosthi",
      src: "https://ia802907.us.archive.org/26/items/kishordergan/Dharabornona-Start.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Aj Rongin Shopno Dekhe by Saimum Shilpigosthi",
      src: "https://ia902907.us.archive.org/26/items/kishordergan/Aj-Rongin-Shopno-Dekhe.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Azan Holo Oi Shuna Jay by Saimum Shilpigosthi",
      src: "https://ia801002.us.archive.org/15/items/uromegher/Azan-Holo-Oi-Shuna-Jay.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ami Tomar Moton Apon Kore by Saimum Shilpigosthi",
      src: "https://ia801001.us.archive.org/5/items/anupranon/Ami-Tomar-Moton-Apon-Kore.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Jotodin Ei Dehe Ache by www.almodina.com",
      src: "https://ia903102.us.archive.org/13/items/allahke/Jotodin-Ei-Dehe-Ache.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Dharabornona - Ruper Nodi by Saimum Shilpigosthi",
      src: "https://ia600302.us.archive.org/9/items/rupernodi/Dharabornona-Ruper-Nodi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Allah Subhan Tumi Meherban by Sohail Ahmed Khan - Saimum",
      src: "https://ia601004.us.archive.org/35/items/bismillah51/Allah-Subhan-Tumi-Meherban.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Lal Shobujer Ei Potaka by Saimum Shilpigosthi",
      src: "https://ia601207.us.archive.org/32/items/monihar/Lal-Shobujer-Ei-Potaka.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Moumachi Moumachi by Saimum Shilpigosthi",
      src: "https://ia600302.us.archive.org/9/items/rupernodi/Moumachi-Moumachi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Amay Ekti Vanga Kolom Daw by Saimum &amp; Panjeri",
      src: "https://ia803107.us.archive.org/32/items/bondhon/Amay-Ekti-Vanga-Kolom-Daw.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Eid elore ashlo abar eid by Saimum Shilpigosthi",
      src: "https://ia803101.us.archive.org/6/items/eidergan/Eid-elore-ashlo-abar-eid.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ami meghin brishti by Saimum Shilpigosthi",
      src: "https://ia601207.us.archive.org/24/items/sizday/Ami-meghin-brrshti.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Malikul Mulk by Sohail Ahmed Khan - Saimum",
      src: "https://ia801004.us.archive.org/35/items/bismillah51/Malikul-Mulk.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Islam Noy Kono Dhormer Nam by Didarul Islam - Saimum",
      src: "https://ia801005.us.archive.org/28/items/shopner/Islam-Noy-Kono-Dhormer-Nam.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Uro Megher Ghurire Tui by Saimum Shilpigosthi",
      src: "https://ia801002.us.archive.org/15/items/uromegher/Uro-Megher-Ghurire-Tui.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ramzaner Oi Roja Palon by Saimum Shilpigosthi",
      src: "https://ia903100.us.archive.org/20/items/ramzanergan/Ramzaner-Oi-Roja-Palon.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Moner O Pinjore Kotona Adore by Shafiq Adnan - Saimum",
      src: "https://ia803106.us.archive.org/7/items/monmohajon/Moner-O-Pinjore-Kotona-Adore.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ei Saimum Hawa Elomelo by Saimum Shilpigosthi",
      src: "https://ia800500.us.archive.org/17/items/saimumhawa/Ei-Saimum-Hawa-Elomelo.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Baganer Fulgulo Provur Name by Saimum Shilpigosthi",
      src: "https://ia800302.us.archive.org/9/items/rupernodi/Baganer-Fulgulo-Provur-Name.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Lokkho Tarar Majhe Chadti Jemon by Saimum Shilpigosthi",
      src: "https://ia600801.us.archive.org/0/items/tomakei/Lokkho-Tarar-Majhe-Chadti-Jemon.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Bochor Ghure Abar Elo by Saimum &amp; Jagoron Shilpigosthi",
      src: "https://ia600603.us.archive.org/32/items/siyamergan/Bochor-Ghure-Abar-Elo.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Hotath Kore Keje Daklo by Saimum Shilpigosthi",
      src: "https://ia801207.us.archive.org/32/items/monihar/Hotath-Kore-Keje-Daklo.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Amar Mon Chute Jay by Saimum Shilpigosthi",
      src: "https://ia801002.us.archive.org/15/items/uromegher/Amar-Mon-Chute-Jay.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ore Kokil Ke Tore Dilo by Didarul Islam - Saimum",
      src: "https://ia601005.us.archive.org/28/items/shopner/Ore-Kokil-Ke-Tore-Dilo.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Golap Chapa Bokul Fuler by Saimum Shilpigosthi",
      src: "https://ia601008.us.archive.org/23/items/skgan/Golap-Chapa-Bokul-Fuler.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Hajar Desher Ei Prithibi by Saimum Shilpigosthi",
      src: "https://ia800801.us.archive.org/0/items/tomakei/Hajar-Desher-Ei-Prithibi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Chaya Dhaka Pakhi Daka by Saimum Shilpigosthi",
      src: "https://ia800500.us.archive.org/17/items/saimumhawa/Chaya-Dhaka-Pakhi-Daka.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Esho Allahr Pothe Esho Rasuler Pothe by Saimum Shilpigosthi",
      src: "https://ia601001.us.archive.org/5/items/anupranon/Esho-Allahr-Pothe-Esho-Rasuler-Pothe.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Uddam Mora Durbar by Saimum &amp; Panjeri",
      src: "https://ia903107.us.archive.org/32/items/bondhon/Uddam-Mora-Durbar.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ma Je Amar Ma Jononi by www.almodina.com",
      src: "https://ia803102.us.archive.org/13/items/allahke/Ma-Je-Amar-Ma-Jononi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shotter Pothe Cholo by Saimum &amp; Panjeri",
      src: "https://ia903107.us.archive.org/32/items/bondhon/Shotter-Pothe-Cholo.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Iftar Shomukhe Jokhon Rojadar by Saimum &amp; Jagoron Shilpigosthi",
      src: "https://ia800603.us.archive.org/32/items/siyamergan/Iftar-Shomukhe-Jokhon-Rojadar.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Allah Ke Shotti Valobashe Je by www.almodina.com",
      src: "https://ia803102.us.archive.org/13/items/allahke/Allah-Ke-Shotti-Valobashe-Je.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Dol bedhe sob korche khela by Saimum Shilpigosthi",
      src: "https://ia803101.us.archive.org/6/items/eidergan/Dol-bedhe-sob-korche-khela.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Onurange rongin golap tule by Saimum Shilpigosthi",
      src: "https://ia803101.us.archive.org/6/items/eidergan/Onurange-rongin-golap-tule.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Eid eseche kalke khushir eid by Saimum Shilpigosthi",
      src: "https://ia803101.us.archive.org/6/items/eidergan/Eid-eseche-kalke-khushir-eid.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Priyo Amar Desher Mati by Saimum Shilpigosthi",
      src: "https://ia801006.us.archive.org/0/items/alorprova/Priyo-Amar-Desher-Mati.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Porer Jonno Korle Kichu by Saimum Shilpigosthi",
      src: "https://ia601006.us.archive.org/0/items/alorprova/Porer-Jonno-Korle-Kichu.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Amar nabi sarwer by Saimum Shilpi gosthi",
      src: "https://ia801207.us.archive.org/24/items/sizday/Amar-nabi-sarwer.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Eid maneto khushir khela by Saimum Shilpigosthi",
      src: "https://ia803101.us.archive.org/6/items/eidergan/Eid-maneto-khushir-khela.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ore Banglar Muslim by Saimum Shilpigosthi",
      src: "https://ia600800.us.archive.org/19/items/sopner/Ore-Banglar-Muslim.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ami Jodi Jege Uthi by Saimum Shilpigosthi",
      src: "https://ia802907.us.archive.org/26/items/kishordergan/Ami-Jodi-Jege-Uthi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ya Sayyidi by Saimum Shilpigosthi",
      src: "https://ia800800.us.archive.org/19/items/sopner/Ya-Sayyidi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Je Mati Theke Provu Tumi by Shafiq Adnan - Saimum",
      src: "https://ia803106.us.archive.org/7/items/monmohajon/Je-Mati-Theke-Provu-Tumi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Esho Shobe Shadhinotar by Saimum Shilpigosthi",
      src: "https://ia800500.us.archive.org/17/items/saimumhawa/Esho-Shobe-Shadhinotar.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Quran Poro Rojadar by Saimum &amp; Jagoron Shilpigosthi",
      src: "https://ia600603.us.archive.org/32/items/siyamergan/Quran-Poro-Rojadar.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Golpo Boli Shuno Priyo Nobijir by Saimum Shilpigosthi",
      src: "https://ia800801.us.archive.org/0/items/tomakei/Golpo-Boli-Shuno-Priyo-Nobijir.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "I Love You Muhammad by Saimum Shilpigosthi",
      src: "https://ia802907.us.archive.org/26/items/kishordergan/I-Love-You-Muhammad.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "We The Muslim Ummah by Saimum Shilpigosthi",
      src: "https://ia800801.us.archive.org/0/items/tomakei/We-The-Muslim-Ummah.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shoyone Shopone by Sohail Ahmed Khan - Saimum",
      src: "https://ia801004.us.archive.org/35/items/bismillah51/Shoyone-Shopone.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Dak Esheche Jagte Hobe by Saimum Shilpigosthi",
      src: "https://ia601008.us.archive.org/23/items/skgan/Dak-Esheche-Jagte-Hobe.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Allah Namer Tasbih by www.almodina.com",
      src: "https://ia903102.us.archive.org/13/items/allahke/Allah-Namer-Tasbih.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Allahu Allahu Allahu Allah by Didarul Islam - Saimum",
      src: "https://ia801005.us.archive.org/28/items/shopner/Allahu-Allahu-Allahu-Allah.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "O Majhi Vai by Saimum &amp; Panjeri",
      src: "https://ia903107.us.archive.org/32/items/bondhon/O-Majhi-Vai.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Amar Rober Doyar Kotha by Saimum Shilpigosthi",
      src: "https://ia800801.us.archive.org/0/items/tomakei/Amar-Rober-Doyar-Kotha.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ami Tomar Premer Rong by Saimum Shilpigosthi",
      src: "https://ia601006.us.archive.org/0/items/alorprova/Ami-Tomar-Premer-Rong.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Agune Pora Mon by Shafiq Adnan - Saimum",
      src: "https://ia903106.us.archive.org/7/items/monmohajon/Agune-Pora-Mon.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Janina Ar Futbe Kina by Saimum Shilpigosthi",
      src: "https://ia600800.us.archive.org/19/items/sopner/Janina-Ar-Futbe-Kina.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Tora Chashne Kichu Khodar Kache by Saimum Shilpigosthi",
      src: "https://ia601001.us.archive.org/5/items/anupranon/Tora-Chashne-Kichu-Khodar-Kache.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Tomar mohan name khuji ami santona by Saimum Shilpi gosthi",
      src: "https://ia801207.us.archive.org/24/items/sizday/Tomar%20-mohan-name-khuji-ami-santona.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ghum Theke Keu by Saimum Shilpigosthi",
      src: "https://ia803100.us.archive.org/20/items/ramzanergan/Ghum-Theke-Keu.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shokol Bethar Bojha Boite Pare by Saimum &amp; Panjeri",
      src: "https://ia903107.us.archive.org/32/items/bondhon/Shokol-Bethar-Bojha-Boite-Pare.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shagor Nodi Chute Chole by Saimum Shilpigosthi",
      src: "https://ia800800.us.archive.org/19/items/sopner/Shagor-Nodi-Chute-Chole.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "He Amar Praner Priyo by Sohail Ahmed Khan - Saimum",
      src: "https://ia801004.us.archive.org/35/items/bismillah51/He-Amar-Praner-Priyo.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ami Harbona Konodin by Saimum &amp; Panjeri",
      src: "https://ia803107.us.archive.org/32/items/bondhon/Ami-Harbona-Konodin.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shokol Bethar Boja Boite Pare by Saimum Shilpigosthi",
      src: "https://ia801001.us.archive.org/5/items/anupranon/Shokol-Bethar-Boja-Boite-Pare.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Amra Hobo Raza by Saimum Shilpigosthi",
      src: "https://ia801002.us.archive.org/24/items/sopnerdeshe/Amra-Hobo-Raza.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shobuje ghera bangladesh by Saimum Shilpi gosthi",
      src: "https://ia801207.us.archive.org/24/items/sizday/Shobuje-ghera-bangladesh.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Notun Chader Hridoy Theke by Saimum &amp; Jagoron Shilpigosthi",
      src: "https://ia600603.us.archive.org/32/items/siyamergan/Notun-Chader-Hridoy-Theke.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Allahu Allahu by Saimum Shilpi gosthi",
      src: "https://ia801207.us.archive.org/24/items/sizday/Allahu-Allahu.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Hajar Maser Chaite by Saimum Shilpigosthi",
      src: "https://ia803100.us.archive.org/20/items/ramzanergan/Hajar-Maser-Chaite.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Tumi Ful Bagichar Ful by Saimum Shilpigosthi",
      src: "https://ia600500.us.archive.org/17/items/saimumhawa/Tumi-Ful-Bagichar-Ful.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Amra Ekta Notun Shomaj by Saimum Shilpigosthi",
      src: "https://ia801001.us.archive.org/5/items/anupranon/Amra-Ekta-Notun-Shomaj.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Rater Adhare Jei Chad Hashe by Saimum Shilpigosthi",
      src: "https://ia902907.us.archive.org/26/items/kishordergan/Rater-Adhare-Jei-Chad-Hashe.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Onner Dosh Dhorte by Shafiq Adnan - Saimum",
      src: "https://ia803106.us.archive.org/7/items/monmohajon/Onner-Dosh-Dhorte.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "E Je Mahe Ramzan by Saimum Shilpigosthi",
      src: "https://ia803100.us.archive.org/20/items/ramzanergan/E-Je-Mahe-Ramzan.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Hajar Nodi Math Periye by Saimum Shilpigosthi",
      src: "https://ia801006.us.archive.org/0/items/alorprova/Hajar-Nodi-Math-Periye.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Esho Allahke Valobashi by Saimum Shilpigosthi",
      src: "https://ia801008.us.archive.org/23/items/skgan/Esho-Allahke-Valobashi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Nil Akash Sabuj Shemol Math by Saimum Shilpigosthi",
      src: "https://ia800500.us.archive.org/17/items/saimumhawa/Nil-Akash-Sabuj-Shemol-Math.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ekdin Ami Hariye Jabo by Didarul Islam - Saimum",
      src: "https://ia801005.us.archive.org/28/items/shopner/Ekdin-Ami-Hariye-Jabo.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Din Zakat Din by Saimum Shilpigosthi",
      src: "https://ia803100.us.archive.org/20/items/ramzanergan/Din-Zakat-Din.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Qurbani dao qurbani by Saimum Shilpigosthi",
      src: "https://ia903101.us.archive.org/6/items/eidergan/Qurbani-dao-qurbani.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Album Porichiti by Sahabuddin (Saimum)",
      src: "https://ia903102.us.archive.org/13/items/allahke/Album-Porichiti.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Jonmovumigo Tumi Amar by Saimum Shilpigosthi",
      src: "https://ia801002.us.archive.org/24/items/sopnerdeshe/Jonmovumigo-Tumi-Amar.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Tomader Vulini Vulbona Konodin by Saimum &amp; Panjeri",
      src: "https://ia803107.us.archive.org/32/items/bondhon/Tomader-Vulini-Vulbona-Konodin.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shotter Shongrame Fota Ful by Saimum &amp; Panjeri",
      src: "https://ia903107.us.archive.org/32/items/bondhon/Shotter-Shongrame-Fota-Ful.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Bidayok Alok Tumi by Saimum Shilpigosthi",
      src: "https://ia801207.us.archive.org/32/items/monihar/Bidayok-Alok-Tumi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Silpi Bolo Kare Tumi Silpi Bolo Kare by Saimum Shilpigosthi",
      src: "https://ia800302.us.archive.org/9/items/rupernodi/Silpi-Bolo-Kare-Tumi-Silpi-Bolo-Kare.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ay Boishakh Ayre Ay by Saimum Shilpigosthi",
      src: "https://ia902907.us.archive.org/26/items/kishordergan/Ay-Boishakh-Ayre-Ay.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ferestara Nimeshhara by Saimum Shilpigosthi",
      src: "https://ia601006.us.archive.org/0/items/alorprova/Ferestara-Nimeshhara.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Salam Bir Joyan by Saimum &amp; Panjeri",
      src: "https://ia903107.us.archive.org/32/items/bondhon/Salam-Bir-Joyan.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Vorer Shonali Alo by Saimum Shilpigosthi",
      src: "https://ia801003.us.archive.org/3/items/vorerpakhi3/Vorer-Shonali-Alo.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Pata Bahar Pata Bahar by Saimum Shilpigosthi",
      src: "https://ia801002.us.archive.org/24/items/sopnerdeshe/Pata-Bahar-Pata-Bahar.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Tomar Namer Gane by www.almodina.com",
      src: "https://ia803102.us.archive.org/13/items/allahke/Tomar-Namer-Gane.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Sehrir Samoy Holo by Saimum Shilpigosthi",
      src: "https://ia803100.us.archive.org/20/items/ramzanergan/Sehrir-Samoy-Holo.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Intro by Didarul Islam - Saimum",
      src: "https://ia801005.us.archive.org/28/items/shopner/Intro.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Jhornar Pashe Darale by Saimum Shilpigosthi",
      src: "https://ia600801.us.archive.org/0/items/tomakei/Jhornar-Pashe-Darale.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shababal Akidati by Saimum Shilpigosthi",
      src: "https://ia801008.us.archive.org/23/items/skgan/Shababal-Akidati.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shotter Shongrame Fota Full by Saimum Shilpigosthi",
      src: "https://ia801001.us.archive.org/5/items/anupranon/Shotter-Shongrame-Fota-Full.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Bismillah by Sohail Ahmed Khan - Saimum",
      src: "https://ia601004.us.archive.org/35/items/bismillah51/Bismillah.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Malik Tumi Dao Disha Dao by Shafiq Adnan - Saimum",
      src: "https://ia903106.us.archive.org/7/items/monmohajon/Malik-Tumi-Dao-Disha-Dao.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Agune Pora Mon by Didarul Islam - Saimum",
      src: "https://ia601005.us.archive.org/28/items/shopner/Agune-Pora-Mon.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ghum Theke Ma Deke Dio by Saimum Shilpigosthi",
      src: "https://ia801002.us.archive.org/15/items/uromegher/Ghum-Theke-Ma-Deke-Dio.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ekti Shishu Takiye Thake by Saimum Shilpigosthi",
      src: "https://ia801002.us.archive.org/24/items/sopnerdeshe/Ekti-Shishu-Takiye-Thake.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Sritir Otole Giye by Didarul Islam - Saimum",
      src: "https://ia601005.us.archive.org/28/items/shopner/Sritir-Otole-Giye.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Amra Shobai Ek by Saimum Shilpigosthi",
      src: "https://ia800800.us.archive.org/19/items/sopner/Amra-Shobai-Ek.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Jarin Horofe Lekha by Didarul Islam - Saimum",
      src: "https://ia801005.us.archive.org/28/items/shopner/Jarin-Horofe-Lekha.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shurjodoyer Desh Bangladesh by Saimum Shilpigosthi",
      src: "https://ia801207.us.archive.org/32/items/monihar/Shurjodoyer-Desh-Bangladesh.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Jodi Hoy Shadhinota by Didarul Islam - Saimum",
      src: "https://ia801005.us.archive.org/28/items/shopner/Jodi-Hoy-Shadhinota.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Dustur Dustami Thamena Je Ar by Saimum Shilpigosthi",
      src: "https://ia801002.us.archive.org/24/items/sopnerdeshe/Dustur-Dustami-Thamena-Je-Ar.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Bajiche Damama Badre Amama by Saimum &amp; Panjeri",
      src: "https://ia803107.us.archive.org/32/items/bondhon/Bajiche-Damama-Badre-Amama.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Pon Korechi Shotto Neyer by Saimum Shilpigosthi",
      src: "https://ia601008.us.archive.org/23/items/skgan/Pon-Korechi-Shotto-Neyer.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Salam Salam Hajar Salam He Priyo by Saimum Shilpigosthi",
      src: "https://ia801001.us.archive.org/5/items/anupranon/Salam-Salam-Hajar-Salam-He-Priyo.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Charidike Furti Anondo Ullash by Saimum Shilpigosthi",
      src: "https://ia801002.us.archive.org/15/items/uromegher/Charidike-Furti-Anondo-Ullash.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Kharap Kothata Na Bolata by Saimum Shilpigosthi",
      src: "https://ia801002.us.archive.org/15/items/uromegher/Kharap-Kothata-Na-Bolata.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Allahu Allahu Allahu by Saimum Shilpigosthi",
      src: "https://ia801008.us.archive.org/23/items/skgan/Allahu-Allahu-Allahu.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ki Je Modhur Lage by www.almodina.com",
      src: "https://ia803102.us.archive.org/13/items/allahke/Ki-Je-Modhur-Lage.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Eider khushi opurno roye jabe by Saimum Shilpigosthi",
      src: "https://ia903101.us.archive.org/6/items/eidergan/Eider%20khushi%20opurno%20roye%20jabe.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Hajar Desher Ei Prithibi by Saimum Shilpigosthi",
      src: "https://ia601006.us.archive.org/0/items/alorprova/Hajar-Desher-Ei-Prithibi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Amar Je kotha Kaje Sobai Khusi by Saimum Shilpigosthi",
      src: "https://ia800302.us.archive.org/9/items/rupernodi/Amar-Je-kotha-Kaje-Sobai-Khusi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Latan Sa by Saimum Shilpigosthi",
      src: "https://ia800302.us.archive.org/9/items/rupernodi/Latan-Sa.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Dharabornona End by Saimum Shilpigosthi",
      src: "https://ia902907.us.archive.org/26/items/kishordergan/Dharabornona-End.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Batasher Jhiri Jhiri Shobde by Saimum Shilpigosthi",
      src: "https://ia902907.us.archive.org/26/items/kishordergan/Batasher-Jhiri-Jhiri%20Shobde.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "She Kon Bondhu Bolo Beshi Bisshosto by Didarul Islam - Saimum",
      src: "https://ia801005.us.archive.org/28/items/shopner/She-Kon-Bondhu-Bolo-Beshi-Bisshosto.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Al Quran er Poth by Saimum Shilpigosthi",
      src: "https://ia800801.us.archive.org/0/items/tomakei/Al-Quran-er-Poth.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shagor Nodi Ar Pahar Bone by Saimum Shilpigosthi",
      src: "https://ia801006.us.archive.org/0/items/alorprova/Shagor-Nodi-Ar-Pahar-Bone.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ei Oli Allahr Bangladesh by Saimum Shilpigosthi",
      src: "https://ia800800.us.archive.org/19/items/sopner/Ei-Oli-Allahr-Bangladesh.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Allah Mohan Allah Mohan by Saimum Shilpigosthi",
      src: "https://ia801207.us.archive.org/32/items/monihar/Allah-Mohan-Allah-Mohan.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Esho Shantir Pothe Aj by Saimum &amp; Panjeri",
      src: "https://ia803107.us.archive.org/32/items/bondhon/Esho-Shantir-Pothe-Aj.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shobe kodor Er Mane by Saimum &amp; Jagoron Shilpigosthi",
      src: "https://ia800603.us.archive.org/32/items/siyamergan/Shobe-kodor-Er-Mane.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Temon Manush Milbena Ar by Saimum Shilpigosthi",
      src: "https://ia601008.us.archive.org/23/items/skgan/Temon-Manush-Milbena-Ar.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Mukhe mukhe shukher kotha by Saimum Shilpigosthi",
      src: "https://ia903101.us.archive.org/6/items/eidergan/Mukhe-mukhe-shukher-kotha.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Bochor Bochor Ashe Ar Jay by Saimum &amp; Jagoron Shilpigosthi",
      src: "https://ia600603.us.archive.org/32/items/siyamergan/Bochor-Bochor-Ashe-Ar-Jay.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shuno Oi Pothe Namar Dak Esheche by Saimum &amp; Panjeri",
      src: "https://ia903107.us.archive.org/32/items/bondhon/Shuno-Oi-Pothe-Namar-Dak-Esheche.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "He Gumonto Manush Jago by Saimum Shilpigosthi",
      src: "https://ia801001.us.archive.org/5/items/anupranon/He-Gumonto-Manush-Jago.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Diyechi Topto Kolijar Khun by Saimum &amp; Panjeri",
      src: "https://ia803107.us.archive.org/32/items/bondhon/Diyechi-Topto-Kolijar-Khun.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Muslim Aj Utho Jago by Saimum Shilpigosthi",
      src: "https://ia801001.us.archive.org/5/items/anupranon/Muslim-Aj-Utho-Jago.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Fotay Fotay Bristi Elo by Saimum Shilpigosthi",
      src: "https://ia801002.us.archive.org/24/items/sopnerdeshe/Fotay-Fotay-Bristi-Elo.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Bipote Jao Ulta Cholo by Shafiq Adnan - Saimum",
      src: "https://ia803106.us.archive.org/7/items/monmohajon/Bipote-Jao-Ulta-Cholo.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Amra Shobai Shotto Neyer by Saimum Shilpigosthi",
      src: "https://ia801008.us.archive.org/23/items/skgan/Amra-Shobai-Shotto-Neyer.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Dheuyer Pore Dheu by www.almodina.com",
      src: "https://ia803102.us.archive.org/13/items/allahke/Dheuyer-Pore-Dheu.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Eid niye ase ek notun abesh by Saimum Shilpigosthi",
      src: "https://ia803101.us.archive.org/6/items/eidergan/Eid-niye-ase-ek-notun-abesh.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Roz hashore dine jedin by Saimum Shilpi gosthi",
      src: "https://ia801207.us.archive.org/24/items/sizday/Roz-hashore-dine-jenin.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Nodir Kolotane by Saimum Shilpigosthi",
      src: "https://ia800302.us.archive.org/9/items/rupernodi/Nodir-Kolotane.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shondha Tarar Moto Jiboner Sat Rong by Saimum Shilpigosthi",
      src: "https://ia800500.us.archive.org/17/items/saimumhawa/Shondha-Tarar-Moto-Jiboner-Sat-Rong.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Allahu Allahu Allahu Allah by Saimum Shilpigosthi",
      src: "https://ia801207.us.archive.org/32/items/monihar/Allahu-Allahu-Allahu-Allah.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Dhorate Agomone Peyara Nabi by Saimum Shilpigosthi",
      src: "https://ia800800.us.archive.org/19/items/sopner/Dhorate-Agomone-Peyara-Nabi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Brishtir moto jhore by Saimum Shilpi gosthi",
      src: "https://ia601207.us.archive.org/24/items/sizday/Brishtir-moto-jhore.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ei Je Mogo Garame Mora Valo Achi by Saimum Shilpigosthi",
      src: "https://ia800302.us.archive.org/9/items/rupernodi/Ei-Je-Mogo-Garame-Mora-Valo-Achi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ami Jani Jane Shokole by Saimum Shilpigosthi",
      src: "https://ia801002.us.archive.org/24/items/sopnerdeshe/Ami-Jani-Jane-Shokole.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shat Shagor Ar Tero Nodi by Saimum Shilpigosthi",
      src: "https://ia801002.us.archive.org/24/items/sopnerdeshe/Shat-Shagor-Ar-Tero-Nodi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ayre mumin ay imandar by Saimum Shilpigosthi",
      src: "https://ia803101.us.archive.org/6/items/eidergan/Ayre-mumin-ay-imandar.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "at last by Saimum Shilpigosthi",
      src: "https://ia800302.us.archive.org/9/items/rupernodi/at-last.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Abar Elo Ramzan by Saimum Shilpigosthi",
      src: "https://ia803100.us.archive.org/20/items/ramzanergan/Abar-Elo-Ramzan.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Kisher Bibed Goro Tomra by Saimum &amp; Panjeri",
      src: "https://ia803107.us.archive.org/32/items/bondhon/Kisher-Bibed-Goro-Tomra.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Amar Mayer Jaynamazta by Saimum Shilpigosthi",
      src: "https://ia802907.us.archive.org/26/items/kishordergan/Amar-Mayer-Jaynamazta.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Allah Allah Allah Allahu by Saimum Shilpigosthi",
      src: "https://ia601207.us.archive.org/32/items/monihar/Allah-Allah-Allah-Allahu.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Saimum Album Theme Song by Saimum Shilpigosthi",
      src: "https://ia601207.us.archive.org/24/items/sizday/Saimum-Album-Theme-Song.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shah jalaler Shah Makhdumer by Saimum Shilpigosthi",
      src: "https://ia801001.us.archive.org/5/items/anupranon/Shah-jalaler-Shah-Makhdumer.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Jibon Namer Shopner Khelaghor by Didarul Islam - Saimum",
      src: "https://ia601005.us.archive.org/28/items/shopner/Jibon-Namer-Shopner-Khelaghor.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ami Jodi Konodin Poth Vule Jai by Saimum Shilpigosthi",
      src: "https://ia801006.us.archive.org/0/items/alorprova/Ami-Jodi-Konodin-Poth-Vule-Jai.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Sajer Bela Pakhi Fire Nire by Saimum Shilpigosthi",
      src: "https://ia600801.us.archive.org/0/items/tomakei/Sajer-Bela-Pakhi-Fire-Nire.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Akasher Kol Gheshe Baka Chad by Saimum &amp; Jagoron Shilpigosthi",
      src: "https://ia800603.us.archive.org/32/items/siyamergan/Akasher-Kol-Gheshe-Baka-Chad.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "He Prio Rasul Tumi Acho by Saimum Shilpigosthi",
      src: "https://ia600500.us.archive.org/17/items/saimumhawa/He-Prio-Rasul-Tumi-Acho.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Cholo Bondhu Hariye Jai by Saimum Shilpigosthi",
      src: "https://ia802907.us.archive.org/26/items/kishordergan/Cholo-Bondhu-Hariye-Jai.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shikkhar Alo Jele Dao by Saimum Shilpigosthi",
      src: "https://ia801006.us.archive.org/0/items/alorprova/Shikkhar-Alo-Jele-Dao.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Rahmat Barkat Magferate by Saimum Shilpigosthi",
      src: "https://ia803100.us.archive.org/20/items/ramzanergan/Rahmat-Barkat-Magferate.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Nodi Nodi Hayre Nodi by Saimum Shilpigosthi",
      src: "https://ia802907.us.archive.org/26/items/kishordergan/Nodi-Nodi-Hayre-Nodi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shobujer choyate tomake mone pore by Saimum Shilpi gosthi",
      src: "https://ia601207.us.archive.org/24/items/sizday/Shobujer-choyate-tomake-mone-pore.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shotter Pothe Cholo Bohudur by Saimum Shilpigosthi",
      src: "https://ia801001.us.archive.org/5/items/anupranon/Shotter-Pothe-Cholo-Bohudur.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Eid maneto noyre kebol by Saimum Shilpigosthi",
      src: "https://ia903101.us.archive.org/6/items/eidergan/Eid-maneto-noyre-kebol.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Choto Choto Pran Gulo by Saimum Shilpigosthi",
      src: "https://ia801008.us.archive.org/23/items/skgan/Choto-Choto-Pran-Gulo.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Baba Tumi Kothay by www.almodina.com",
      src: "https://ia803102.us.archive.org/13/items/allahke/Baba-Tumi-Kothay.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Amar Din Ki Emne Jabe by Didarul Islam - Saimum",
      src: "https://ia601005.us.archive.org/28/items/shopner/Amar-Din-Ki-Emne-Jabe.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Salam Birjoyan Shohid Noujoyan by Saimum Shilpigosthi",
      src: "https://ia801001.us.archive.org/5/items/anupranon/Salam-Birjoyan-Shohid-Noujoyan.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Akashta Gorecho Allah Tumi by Saimum Shilpigosthi",
      src: "https://ia802907.us.archive.org/26/items/kishordergan/Akashta-Gorecho-Allah-Tumi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Akashe Megher Deshe by Saimum Shilpigosthi",
      src: "https://ia903100.us.archive.org/20/items/ramzanergan/Akashe-Megher-Deshe.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Amra Sisu Fuler Koli by Saimum Shilpigosthi",
      src: "https://ia800302.us.archive.org/9/items/rupernodi/Amr-%20Sisu-Fuler-Koli.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ma Tomake Niye by Saimum Shilpigosthi",
      src: "https://ia801006.us.archive.org/0/items/alorprova/Ma-Tomake-Niye.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Allah Tumi Doyaban by Saimum Shilpigosthi",
      src: "https://ia902907.us.archive.org/26/items/kishordergan/Allah-Tumi-Doyaban.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Lokkho Ganer Silpi Hote Chaina Ami Kovu by Saimum Shilpigosthi",
      src: "https://ia800302.us.archive.org/9/items/rupernodi/Lokkho-Ganer-Silpi-Hote-Chaina-Ami-Kovu.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Elo melo mon aaz by Saimum Shilpigosthi",
      src: "https://ia601207.us.archive.org/24/items/sizday/Elo-melo-mon-aaz.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Koto Thikanahin Manob Shishu by Saimum Shilpigosthi",
      src: "https://ia801006.us.archive.org/0/items/alorprova/Koto-Thikanahin-Manob-Shishu.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Majhe Majhe Monta by Didarul Islam - Saimum",
      src: "https://ia601005.us.archive.org/28/items/shopner/Majhe-Majhe-Monta.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Rahmate Ar Magfirate by Saimum &amp; Jagoron Shilpigosthi",
      src: "https://ia600603.us.archive.org/32/items/siyamergan/Rahmate-Ar-Magfirate.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Tomar Agomone Mukti Pelo by Saimum Shilpigosthi",
      src: "https://ia601207.us.archive.org/32/items/monihar/Tomar-Agomone-Mukti-Pelo.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shohider rokto britha jayna by Saimum Shilpi gosthi",
      src: "https://ia801207.us.archive.org/24/items/sizday/Shohider-rokto-britha%20jayna.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ramzaner Oi Sawgat Loye by Saimum Shilpigosthi",
      src: "https://ia803100.us.archive.org/20/items/ramzanergan/Ramzaner-Oi-Sawgat-Loye.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ei Dhoroni Oi Nil Asman by Saimum Shilpigosthi",
      src: "https://ia600800.us.archive.org/19/items/sopner/Ei-Dhoroni-Oi-Nil-Asman.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Allahu Akbar Allahu Akbar by Saimum Shilpigosthi",
      src: "https://ia600500.us.archive.org/17/items/saimumhawa/Allahu-Akbar-Allahu-Akbar.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Shokaler Shurjota Koto Shundor by Saimum Shilpigosthi",
      src: "https://ia902907.us.archive.org/26/items/kishordergan/Shokaler-Shurjota-Koto-Shundor.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Sara Diner Rojar Shshe by Saimum Shilpigosthi",
      src: "https://ia803100.us.archive.org/20/items/ramzanergan/Sara-Diner-Rojar-Shshe.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Aj anondo proti prane prane by Saimum Shilpigosthi",
      src: "https://ia803101.us.archive.org/6/items/eidergan/Aj-anondo-proti-prane-prane.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Megher Chadwa Nere Akashe by www.almodina.com",
      src: "https://ia803102.us.archive.org/13/items/allahke/Megher-Chadwa-Nere-Akashe.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ekti Nodi Ekti Shobuj Gram by www.almodina.com",
      src: "https://ia903102.us.archive.org/13/items/allahke/Ekti-Nodi-Ekti-Shobuj-Gram.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "O Amar Ma by Saimum Shilpigosthi",
      src: "https://ia600800.us.archive.org/19/items/sopner/O-Amar-Ma.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Allah Is Our Lord by Saimum Shilpigosthi",
      src: "https://ia801207.us.archive.org/32/items/monihar/Allah-Is-Our-Lord.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Dukhider Priyojon Tumi by Saimum Shilpigosthi",
      src: "https://ia800801.us.archive.org/0/items/tomakei/Dukhider-Priyojon-Tumi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Nodire O Nodi by Saimum Shilpigosthi",
      src: "https://ia800800.us.archive.org/19/items/sopner/Nodire-O-Nodi.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Bodorer Mash Elo Kodorer Mash Elo by Saimum &amp; Jagoron Shilpigosthi",
      src: "https://ia800603.us.archive.org/32/items/siyamergan/Bodorer-Mash-Elo-Kodorer-Mash-Elo.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ei Desh Matir Gondhe by Saimum Shilpigosthi",
      src: "https://ia801207.us.archive.org/32/items/monihar/Ei-Desh-Matir-Gondhe.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Tumi Rahmate Alom Jane by Saimum Shilpigosthi",
      src: "https://ia801008.us.archive.org/23/items/skgan/Tumi-Rahmate-Alom-Jane.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Majhe Majhe Monta by Saimum Shilpigosthi",
      src: "https://ia601207.us.archive.org/32/items/monihar/Majhe-Majhe-Monta.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ramzaneri Pobitrata by Saimum Shilpigosthi",
      src: "https://ia803100.us.archive.org/20/items/ramzanergan/Ramzaneri-Pobitrata.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Sagotom He Mahe Ramzan by Saimum &amp; Jagoron Shilpigosthi",
      src: "https://ia800603.us.archive.org/32/items/siyamergan/Sagotom-He-Mahe-Ramzan.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Buke Beke Kara Jeleche Agun by Saimum &amp; Panjeri",
      src: "https://ia903107.us.archive.org/32/items/bondhon/Buke-Beke-Kara-Jeleche-Agun.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ei Desh Amar Mati Amar by Saimum Shilpigosthi",
      src: "https://ia600800.us.archive.org/19/items/sopner/Ei-Desh-Amar-Mati-Amar.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "He Rasul Bujhina Ami by Saimum Shilpigosthi",
      src: "https://ia801001.us.archive.org/5/items/anupranon/He-Rasul-Bujhina-Ami.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Abar Pran Fire Pabe by www.almodina.com",
      src: "https://ia903102.us.archive.org/13/items/allahke/Abar-Pran-Fire-Pabe.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Rasul Tumi Je Amar by Saimum Shilpigosthi",
      src: "https://ia801008.us.archive.org/23/items/skgan/Rasul-Tumi-Je-Amar.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Mora Hote Chai Priyotomo by Saimum Shilpigosthi",
      src: "https://ia801008.us.archive.org/23/items/skgan/Mora-Hote-Chai-Priyotomo.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Choto Thakbona Mora by Saimum Shilpigosthi",
      src: "https://ia601008.us.archive.org/23/items/skgan/Choto-Thakbona-Mora.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Amar Ma Amar Kache by Saimum Shilpigosthi",
      src: "https://ia601207.us.archive.org/32/items/monihar/Amar-Ma-Amar-Kache.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ami Juddho Ki Bujhina by Saimum Shilpigosthi",
      src: "https://ia801002.us.archive.org/15/items/uromegher/Ami-Juddho-Ki-Bujhina.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ekhono Tui Kenore Miche by Shafiq Adnan - Saimum",
      src: "https://ia803106.us.archive.org/7/items/monmohajon/Ekhono-Tui-Kenore-Miche.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Ke Jao Tumi Kabar Pothe by Didarul Islam - Saimum",
      src: "https://ia801005.us.archive.org/28/items/shopner/Ke-Jao-Tumi-Kabar-Pothe.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Sharata Prithibi Aj Karbala by Saimum Shilpigosthi",
      src: "https://ia800800.us.archive.org/19/items/sopner/Sharata-Prithibi-Aj-Karbala.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Amader Chokhe Mukhe Shobujer Gan by Saimum Shilpigosthi",
      src: "https://ia800500.us.archive.org/17/items/saimumhawa/Amader-Chokhe-Mukhe-Shobujer-Gan.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },
    {
      title: "Eid elo manusher jonno by Saimum Shilpigosthi",
      src: "https://ia803101.us.archive.org/6/items/eidergan/Eid-elo-manusher-jonno.mp3",
      artist: "Unknown",
      category: "SymomSaimum Shilpigosthi"
    },









  ], []);


  const categories = useMemo(() => {
    const all = playlist.map(track => track.category.trim());
    return ["All", ...Array.from(new Set(all))];
  }, [playlist]);



  const audioRef = useRef<HTMLAudioElement | null>(null);

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  }, [playlist.length]);

  const previousTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const filteredPlaylist = useMemo(() => {
    return playlist.filter(track => {
      const matchesSearch = track.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || track.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [playlist, searchTerm, selectedCategory]);



  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // only set src and load on track change
    audio.src = playlist[currentTrackIndex].src;
    audio.load();

    const updateDuration = () => setDuration(audio.duration || 0);
    const updateCurrentTime = () => setCurrentTime(audio.currentTime || 0);
    const handleEnded = () => nextTrack();

    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("ended", handleEnded);

    // autoplay if already playing
    if (isPlaying) {
      audio.play();
    }

    return () => {
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrackIndex]); // only depends on track index
  useEffect(() => {
    if (playingTrackRef.current) {
      playingTrackRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedCategory]);
  

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) =>
    `${Math.floor(time / 60).toString().padStart(2, "0")}:${Math.floor(time % 60).toString().padStart(2, "0")}`;
  const handleTrackSelect = (index: number) => {
    const selectedTrack = filteredPlaylist[index];
    const actualIndex = playlist.findIndex(
      (track) => track.src === selectedTrack.src
    );

    if (actualIndex !== -1) {
      setCurrentTrackIndex(actualIndex);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <audio ref={audioRef} />

      {/* Top Info */}
      <div className="flex items-center gap-4 mb-4">
        <Image
          src="/album-cover.jpg"
          alt="Album Cover"
          width={80}
          height={80}
          className="rounded-md shadow-lg"
        />
        <div>
          <h1 className="text-2xl font-semibold">{playlist[currentTrackIndex].title}</h1>
        </div>
      </div>

      {/* {searchTerm} */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 w-full md:w-1/2"
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 ml-auto"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat === "All" ? "all" : cat}>
              {cat === "All" ? "All Categories" : cat}
            </option>
          ))}
        </select>

      </div>

      {/* Controls + Seek */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
          <div className="flex gap-3">
            <button onClick={previousTrack} className="bg-gray-700 px-4 py-2 rounded">⏮️</button>
            <button onClick={togglePlayPause} className="bg-blue-500 px-6 py-2 rounded">
              {isPlaying ? "⏸️ Pause" : "▶️ Play"}
            </button>
            <button onClick={nextTrack} className="bg-gray-700 px-4 py-2 rounded">⏭️</button>
          </div>

          <input
            type="range"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            className="flex-1 accent-blue-500"
          />
        </div>

        {/* Volume + Time */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            🔊
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolume}
              className="w-32 accent-blue-500"
            />
          </div>
          <div className="text-sm text-gray-300">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>


      {/* Playlist */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-3">🎵 Playlist</h2>
        <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
          {filteredPlaylist.map((track, index) => (

            <li
            ref={playlist[currentTrackIndex].src === track.src ? playingTrackRef : null}
              key={index}
              className={`flex justify-between items-center p-3 rounded-md cursor-pointer transition-all ${
                playlist[currentTrackIndex].src === track.src
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
              
            >
              <div onClick={() => handleTrackSelect(index)} className="flex-1">
                {index === currentTrackIndex ? "✅ " : "🎧 "} {track.title}
              </div>
              <a
                href={track.src.trim()}
                download
                className="ml-4 bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded"
                onClick={(e) => e.stopPropagation()} // prevent play trigger
              >
                ⬇️ Download
              </a>
            </li>

          ))}
        </ul>
      </div>
    </div>
  );
}

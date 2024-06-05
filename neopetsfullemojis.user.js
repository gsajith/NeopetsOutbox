// ==UserScript==
// @name         Neoboard Full Emojis
// @namespace    neopets
// @version      2024-06-05
// @description  Add all emojis and most frequently used to Neoboards
// @author       Gautham Sajith (https://github.com/gsajith)
// @match        https://www.neopets.com/neoboards/topic.phtml?topic=*
// @match        https://www.neopets.com/neoboards/create_topic.phtml?board=*
// @icon         https://www.neopets.com/favicon.ico
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

const EMOTICON_SETS = [
	{
		name: "Standard",
		emoticons: [
			{
				url: "https://images.neopets.com/neoboards/smilies/smiley.gif",
				code: ":)"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/angel.gif",
				code: "0:-)"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/oh.gif",
				code: ":O"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/sad.gif",
				code: ":("
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/grin.gif",
				code: ":D"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/sunglasses.gif",
				code: "B)"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/tongue.gif",
				code: ":P"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/vampire.gif",
				code: ":K"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/winking.gif",
				code: ";)"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/angry.gif",
				code: "*angry*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/clap.gif",
				code: "*clap*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/complain.gif",
				code: "*complain*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/kisskiss.gif",
				code: ":*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/cough.gif",
				code: "*cough*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/cry.gif",
				code: "*cry*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/facepalm.gif",
				code: "*facepalm*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/lol.gif",
				code: "*lol*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/unsure.gif",
				code: "*unsure*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/violin.gif",
				code: "*violin*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/yarr.gif",
				code: "*yarr*"
			},
		]
	},
    {
		name: "Characters",
		emoticons: [
			{
				url: "https://images.neopets.com/neoboards/smilies/aaa.gif",
				code: "*aaa*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/mate.gif",
				code: "*mate*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/abigail.gif",
				code: "*abigail*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/mipsy.gif",
				code: "*mipsy*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/angrylawyerbot.gif",
				code: "*angrylawyerbot*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/mrcoconut.gif",
				code: "*mrcoconut*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/awakened.gif",
				code: "*awakened*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/nabile.gif",
				code: "*nabile*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/boatswain.gif",
				code: "*boatswain*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/nox.gif",
				code: "*nox*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/bree.gif",
				code: "*bree*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/order.gif",
				code: "*order*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/brutes.gif",
				code: "*brutes*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/quartermaster.gif",
				code: "*quartermaster*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/brynn.gif",
				code: "*brynn*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/rigger.gif",
				code: "*rigger*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/cabinboy.gif",
				code: "*cabinboy*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/rohane.gif",
				code: "*rohane*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/capn3legs.gif",
				code: "*capn3legs*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/rower.gif",
				code: "*rower*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/chadley.gif",
				code: "*chadley* or *dreamy*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/seekers.gif",
				code: "*seekers*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/coltzan.gif",
				code: "*coltzan*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/shopwiz.gif",
				code: "*shopwiz*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/cook.gif",
				code: "*cook*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/sloth.gif",
				code: "*sloth*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/fyora.gif",
				code: "*fyora*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/snowager.gif",
				code: "*snowager*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/gunner.gif",
				code: "*gunner*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/swabbie.gif",
				code: "*swabbie*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/hanso.gif",
				code: "*hanso*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/sway.gif",
				code: "*sway*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/happiness.gif",
				code: "*happiness*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/talinia.gif",
				code: "*talinia*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/illusen.gif",
				code: "*illusen*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/techomaster.gif",
				code: "*techomaster*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/jazan.gif",
				code: "*jazan*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/thieves.gif",
				code: "*thieves*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/jhudora.gif",
				code: "*jhudora*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/turmaculus.gif",
				code: "*turmaculus*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/lawyerbot.gif",
				code: "*lawyerbot*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/velm.gif",
				code: "*velm*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/lulu.gif",
				code: "*lulu*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/wizard.gif",
				code: "*wizard*"
			},
		]
	},
    	{
		name: "Pets",
		emoticons: [
			{
				url: "https://images.neopets.com/neoboards/smilies/acara.gif",
				code: "*acara*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/kyrii.gif",
				code: "*kyrii*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/aisha.gif",
				code: "*aisha*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/lenny.gif",
				code: "*lenny*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/blumaroo.gif",
				code: "*blumaroo*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/lupe.gif",
				code: "*lupe*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/bori.gif",
				code: "*bori*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/lutari.gif",
				code: "*lutari*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/bruce.gif",
				code: "*bruce*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/meerca.gif",
				code: "*meerca*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/buzz.gif",
				code: "*buzz*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/moehog.gif",
				code: "*moehog*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/chia.gif",
				code: "*chia*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/mynci.gif",
				code: "*mynci*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/chomby.gif",
				code: "*chomby*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/nimmo.gif",
				code: "*nimmo*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/cybunny.gif",
				code: "*cybunny*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/ogrin.gif",
				code: "*ogrin*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/draik.gif",
				code: "*draik*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/peophin.gif",
				code: "*peophin*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/elephante.gif",
				code: "*elephante*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/poogle.gif",
				code: "*poogle*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/eyrie.gif",
				code: "*eyrie*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/pteri.gif",
				code: "*pteri*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/flotsam.gif",
				code: "*flotsam*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/quiggle.gif",
				code: "*quiggle*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/gelert.gif",
				code: "*gelert*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/ruki.gif",
				code: "*ruki*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/gnorbu.gif",
				code: "*gnorbu*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/scorchio.gif",
				code: "*scorchio*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/grarrl.gif",
				code: "*grarrl*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/shoyru.gif",
				code: "*shoyru*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/grundo.gif",
				code: "*grundo*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/skeith.gif",
				code: "*skeith*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/hissi.gif",
				code: "*hissi*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/techo.gif",
				code: "*techo*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/ixi.gif",
				code: "*ixi*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/tonu.gif",
				code: "*tonu*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/jetsam.gif",
				code: "*jetsam*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/tuskaninny.gif",
				code: "*tuskaninny*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/jubjub.gif",
				code: "*jubjub*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/uni.gif",
				code: "*uni*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/kacheek.gif",
				code: "*kacheek*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/usul.gif",
				code: "*usul*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/kau.gif",
				code: "*kau*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/vandagyre.gif",
				code: "*vandagyre*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/kiko.gif",
				code: "*kiko*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/wocky.gif",
				code: "*wocky*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/koi.gif",
				code: "*koi*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/xweetok.gif",
				code: "*xweetok*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/korbat.gif",
				code: "*korbat*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/yurble.gif",
				code: "*yurble*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/kougra.gif",
				code: "*kougra*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/zafara.gif",
				code: "*zafara*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/krawk.gif",
				code: "*krawk*"
			},
		]
	},
    	{
		name: "Petpets",
		emoticons: [
			{
				url: "https://images.neopets.com/neoboards/smilies/angelpuss.gif",
				code: "*angelpuss*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/pinchit.gif",
				code: "*pinchit*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/feepit.gif",
				code: "*feepit*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/plumpy.gif",
				code: "*plumpy*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/jellykacheek.gif",
				code: "*jellykacheek*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/purplebug.gif",
				code: "*purplebug*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/jimmi.gif",
				code: "*jimmi*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/slorg.gif",
				code: "*slorg*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/jinjah.gif",
				code: "*jinjah*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/snowbunny.gif",
				code: "*snowbunny*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/kadoatery.gif",
				code: "*kadoatery*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/spyder.gif",
				code: "*spyder*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/kadoatie.gif",
				code: "*kadoatie*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/swipe.gif",
				code: "*swipe*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/larnikin.gif",
				code: "*larnikin*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/warf.gif",
				code: "*warf*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/meepit.gif",
				code: "*meepit*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/weewoo.gif",
				code: "*weewoo*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/meowclops.gif",
				code: "*meowclops*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/woogy.gif",
				code: "*woogy*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/mootix.gif",
				code: "*mootix*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/yooyu.gif",
				code: "*yooyu*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/niptor.gif",
				code: "*niptor*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/zomutt.gif",
				code: "*zomutt*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/noil.gif",
				code: "*noil*"
			},
		]
	},
    	{
		name: "Items",
		emoticons: [
			{
				url: "https://images.neopets.com/neoboards/smilies/babypb.gif",
				code: "*babypb*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/bacon.gif",
				code: "*bacon*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/baf.gif",
				code: "*baf*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/battleduck.gif",
				code: "*battleduck*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/bdf.gif",
				code: "*bdf*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/bef.gif",
				code: "*bef*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/bff.gif",
				code: "*bff*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/bgc.gif",
				code: "*bgc*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/blf.gif",
				code: "*blf*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/bluesand.gif",
				code: "*bluesand*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/blurf.gif",
				code: "*blurf*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/book.gif",
				code: "*book*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/bwf.gif",
				code: "*bwf*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/codestone.gif",
				code: "*codestone*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/cookie.gif",
				code: "*cookie*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/cupcake.gif",
				code: "*cupcake*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/dariganpb.gif",
				code: "*dariganpb*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/dbd.gif",
				code: "*dbd*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/dubloon.gif",
				code: "*dubloon*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/eventidepb.gif",
				code: "*eventidepb*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/eventidepppb.gif",
				code: "*eventidepppb*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/faeriepb.gif",
				code: "*faeriepb*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/greensand.gif",
				code: "*greensand*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/icecream.gif",
				code: "*icecream*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/islandpb.gif",
				code: "*islandpb*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/jelly.gif",
				code: "*jelly*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/maractitepb.gif",
				code: "*maractitepb*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/mspp.gif",
				code: "*mspp*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/omelette.gif",
				code: "*omelette*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/orangesand.gif",
				code: "*orangesand*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/pie.gif",
				code: "*pie*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/pinksand.gif",
				code: "*pinksand*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/piratepb.gif",
				code: "*piratepb*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/popcorn.gif",
				code: "*popcorn*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/scroll.gif",
				code: "*scroll*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/sock.gif",
				code: "*sock*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/starberry.gif",
				code: "*starberry*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/stonepie.gif",
				code: "*stonepie*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/suap.gif",
				code: "*suap*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/tigerfruit.gif",
				code: "*tigerfruit*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/twirlyfruit.gif",
				code: "*twirlyfruit*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/ummagine.gif",
				code: "*ummagine*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/woodlandpb.gif",
				code: "*woodlandpb*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/wraithpb.gif",
				code: "*wraithpb*"
			},
		]
	},
    	{
		name: "Altador Cup",
		emoticons: [
			{
				url: "https://images.neopets.com/neoboards/smilies/altador.gif",
				code: "*altador*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/brightvale.gif",
				code: "*brightvale*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/darigan.gif",
				code: "*darigan*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/faerieland.gif",
				code: "*faerieland*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/hauntedwoods.gif",
				code: "*haunted*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/kikolake.gif",
				code: "*kikolake*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/krawkisland.gif",
				code: "*krawkisland*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/kreludor.gif",
				code: "*kreludor*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/lostdesert.gif",
				code: "*lostdesert*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/maraqua.gif",
				code: "*maraqua*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/meridell.gif",
				code: "*meridell*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/mysteryisland.gif",
				code: "*mystery*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/moltara.gif",
				code: "*moltara*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/rooisland.gif",
				code: "*rooisland*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/shenkuu.gif",
				code: "*shenkuu*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/terrormountain.gif",
				code: "*terror*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/tyrannia.gif",
				code: "*tyrannia*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/virtupets.gif",
				code: "*virtupets*"
			},
		]
	},
    	{
		name: "Battledome",
		emoticons: [
			{
				url: "https://images.neopets.com/neoboards/smilies/air.gif",
				code: "*air*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/light.gif",
				code: "*light*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/dark.gif",
				code: "*dark*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/physical.gif",
				code: "*physical*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/earth.gif",
				code: "*earth*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/water.gif",
				code: "*water*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/fire.gif",
				code: "*fire*"
			},
		]
	},
    	{
		name: "Celebration",
		emoticons: [
			{
				url: "https://images.neopets.com/neoboards/smilies/aishadow.gif",
				code: "*aishadow*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/leafright.gif",
				code: "*leafright*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/angrynegg.gif",
				code: "*angrynegg*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/luckydraik.gif",
				code: "*luckydraik*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/bauble.gif",
				code: "*bauble*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/mistletoe.gif",
				code: "*mistletoe*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/bballoon.gif",
				code: "*bballoon*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/negg.gif",
				code: "*negg*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/brownleaf.gif",
				code: "*brownleaf*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/paperlantern.gif",
				code: "*paperlantern*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/cake.gif",
				code: "*cake*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/present.gif",
				code: "*present*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/candle.gif",
				code: "*candle*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/pumpkin.gif",
				code: "*pumpkin*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/candycane.gif",
				code: "*candycane*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/rballoon.gif",
				code: "*rballoon*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/creepyspyder.gif",
				code: "*creepyspyder*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/redleaf.gif",
				code: "*redleaf*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/eekeek.gif",
				code: "*eekeek*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/rednose.gif",
				code: "*rednose*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/fence.gif",
				code: "*fence*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/roses.gif",
				code: "*roses*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/festivalnegg.gif",
				code: "*festivalnegg*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/santa.gif",
				code: "*santa*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/firecrackers.gif",
				code: "*firecrackers*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/shamrock.gif",
				code: "*shamrock*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/fishnegg.gif",
				code: "*fishnegg*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/snowflake.gif",
				code: "*snowflake*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/flower.gif",
				code: "*flower*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/snowman.gif",
				code: "*snowman*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/gballoon.gif",
				code: "*gballoon*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/spyder.gif",
				code: "*spyder*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/ghost.gif",
				code: "*ghost*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/tombstone.gif",
				code: "*tombstone*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/happynegg.gif",
				code: "*happynegg*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/web.gif",
				code: "*web*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/heart.gif",
				code: "*heart*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/witchhat.gif",
				code: "*witch*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/holly.gif",
				code: "*holly*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/xmastree.gif",
				code: "*xmastree*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/jackolantern.gif",
				code: "*jackolantern*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/yballoon.gif",
				code: "*yballoon*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/jinjah.gif",
				code: "*jinjah*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/yellowleaf.gif",
				code: "*yellowleaf*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/leafleft.gif",
				code: "*leafleft*"
			},
		]
	},
    	{
		name: "Miscellaneous",
		emoticons: [
			{
				url: "https://images.neopets.com/neoboards/smilies/0.o.0.gif",
				code: "*0.o.0*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/map.gif",
				code: "*map*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/carrot.gif",
				code: "*carrot*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/moneybag.gif",
				code: "*moneybag*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/catfish.gif",
				code: "*catfish*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/monocle.gif",
				code: "*monocle*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/cloud.gif",
				code: "*cloud*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/moon.gif",
				code: "*moon*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/coffee.gif",
				code: "*coffee*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/raincloud.gif",
				code: "*raincloud*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/dung.gif",
				code: "*dung*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/star.gif",
				code: "*star*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/genie.gif",
				code: "*genie*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/sun.gif",
				code: "*sun*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/indubitably.gif",
				code: "*indubitably*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/tea.gif",
				code: "*tea*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/kqdoor.gif",
				code: "*kqdoor*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/tophat.gif",
				code: "*tophat*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/kqkey.gif",
				code: "*kqkey*"
			},
			{
				url: "https://images.neopets.com/neoboards/smilies/yarn.gif",
				code: "*yarn*"
			},
		]
	},
];

const generatedSheets = [];
let selectedSheet = -1;
const recentEmoticons = GM_getValue('np_favemoticons', {});
let renderedRecent = {};
let recentChanged = false;

const smileyClass = window.location.href.includes("create_topic") ? "topicCreateSmilies-neoboards" : "replySmilies-neoboards";

(function() {
    'use strict';
    const smileyBox = Array.from(document.getElementsByClassName(smileyClass))[0];
    smileyBox.innerHTML = "";
    smileyBox.style.paddingTop = "28px";
    smileyBox.style.minHeight = "100px";
    smileyBox.style.width = "155px";
    if (Object.keys(recentEmoticons).length > 0) {
        const container = createEmoticonSheet("Recent", 0);
        const recents = Object.values(recentEmoticons).sort((a,b) => b.date - a.date).slice(0, 20);
        for (let j = 0; j < recents.length; j++) {
            container.appendChild(createClickableEmoticon(recents[j].emoticon));
        }
        generatedSheets.push(container);
    }
    for(let i = 0; i < EMOTICON_SETS.length; i++) {
        const set = EMOTICON_SETS[i];
        const setName = set.name;
        const container = createEmoticonSheet(setName, generatedSheets.length);
        for (let j = 0; j < set.emoticons.length; j++) {
            container.appendChild(createClickableEmoticon(set.emoticons[j]));
        }
        generatedSheets.push(container);
    }
    selectedSheet = 0;
    smileyBox.appendChild(generatedSheets[selectedSheet]);
})();

function nextSheet() {
    const smileyBox = Array.from(document.getElementsByClassName(smileyClass))[0];
    smileyBox.innerHTML = "";
    selectedSheet = Math.min(selectedSheet+1, generatedSheets.length - 1);
    smileyBox.appendChild(generatedSheets[selectedSheet]);
}

function prevSheet() {
    const smileyBox = Array.from(document.getElementsByClassName(smileyClass))[0];
    smileyBox.innerHTML = "";
    selectedSheet = Math.max(selectedSheet-1, 0);
    if (selectedSheet === 0 && Object.keys(recentEmoticons).length > 0 && recentChanged) {
        const container = createEmoticonSheet("Recent", 0);
        const recents = Object.values(recentEmoticons).sort((a,b) => b.date - a.date).slice(0, 20);
        for (let j = 0; j < recents.length; j++) {
            container.appendChild(createClickableEmoticon(recents[j].emoticon));
        }
        generatedSheets[0] = container;
        recentChanged = false;
    }
    smileyBox.appendChild(generatedSheets[selectedSheet]);
}

function createEmoticonSheet(setName, index) {
    const container = document.createElement('div');
    container.style.width = "100%";
    container.style.position = "relative";

    const navRow = document.createElement('div');
    navRow.style.display = "flex";
    navRow.style.justifyContent = "space-between";
    navRow.style.position = "absolute";
    navRow.style.top = "-28px";
    navRow.style.width = "100%";
    navRow.style.padding = "4px";
    if (window.location.href.includes("create_topic")) {
        navRow.style.background = "#2E72C0";
        navRow.style.color = "white";
    } else {
        navRow.classList.add("topicReplyTitle");
    }
    navRow.style.userSelect = "none";

    const prev = document.createElement('div');
    prev.innerHTML = "←";
    prev.style.cursor = "pointer";
    if (index === 0) { prev.style.visibility = "hidden"; }
    else { prev.onclick = () => prevSheet(); }

    const next = document.createElement('div');
    next.innerHTML = "→";
    next.style.cursor = "pointer";
    if (index === EMOTICON_SETS.length - 1) { next.style.visibility = "hidden"; }
    else { console.log('here'); next.onclick = () => nextSheet(); }

    const label = document.createElement('div');
    label.innerHTML = setName;

    navRow.appendChild(prev);
    navRow.appendChild(label);
    navRow.appendChild(next);

    container.appendChild(navRow);
    return container;
}

function addToRecent(emoticon) {
    recentChanged = true;
    recentEmoticons[emoticon.code] = {emoticon, date: Date.now()};
    GM_setValue('np_favemoticons', recentEmoticons);
}

function createClickableEmoticon(emoticon) {
    const a = document.createElement('a');
    a.href = "#";
    a.classList.add("smiley");
    a.onclick = () => {
        insertSmiley(emoticon.code);
        addToRecent(emoticon);
        return false;
    }
    const img = document.createElement('img');
    img.src = emoticon.url;
    img.alt = emoticon.code;
    img.title = emoticon.code;
    img.border = "0";
    a.appendChild(img);
    return a;
}

// Util function to generate emoticon set, not used in this script
function renderSet(setName, list) {
    let renderedString = "";
    renderedString += "\t{\n";
    renderedString += "\t\tname: \"";
    renderedString += setName;
    renderedString += "\",\n";
    renderedString += "\t\temoticons: [\n";
    for(let i =0; i < list.length; i++) {
        let item = list[i];
        renderedString += "\t\t\t{\n";
        renderedString += "\t\t\t\turl: \"";
        renderedString += item.src;
        renderedString += "\",\n";
        renderedString += "\t\t\t\tcode: \"";
        renderedString += item.parentNode.nextElementSibling.innerHTML;
        renderedString += "\"\n";
        renderedString += "\t\t\t},\n";
    }
    renderedString += "\t\t]\n";
    renderedString += "\t},\n";
    console.log(renderedString);
}


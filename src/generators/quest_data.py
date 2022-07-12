from random import choice, uniform, randint
import json
from math import sqrt

#CONSTANTES--------------------------------------------------------------
difficulty_range={
"easy":[3,6],
"normal":[6,12],
"hard":[20,40]
}
price_range={
"easy":1.103,
"normal":1.11,
"hard":1.114
}

#VARIANT DESCRIPTION-----------------------------------------------------------------------------
#COLOR
couleur_ternes=["noir","blanc","gris","sombre","marron"]
couleurs_vives=["rouge","jaune","vert","bleu","violet","orange"]
couleur_pelage=["rayé","moucheté","tricolor","bai"]
#AJDECTIF
adj_agressif=["féroce","puissant","sanguinaire","lunatique","bestial"]
adj_passif=["doux","paresseux"]
adj_peur=["effrayant","monstrueux","terrifiant","lugubre","maléfique","perfide"]
bad_side=["corrompu"]
#Taille
gros=["géant","colossal","colosse","goliath","élite","titan","titanesque"]

#places------------------------------------------------------------------------------
places_terre_sauvage=["dans les steppes","dans les landes","dans la forêt",'dans le val']
places_terre_urbain=["en ville","dans les parcs","dans les égouts"]
places_ocean=["en eaux tropicales","dans les profondeurs","dans les abysses","dans les récifs"]
places_riviere=["dans les rivières","dans les ruisseaux","dans un fleuve","dans les torrents","dans les fiords"]
places_sombres=["en forêt","dans les cavernes","dans les grottes","dans un gouffre","dans les mines"]
places_glauque=["dans une nécrople","dans les cryptes","dans les égouts"]
places_humides=["dans un marais",'dans une toubière','dans des marigots',"dans la mangrove","dans les rizières"]
places_altitude=["sur la crête","dans les pierriers","dans la montagne","dans les montagnes",]
places_froids=["dans la toundra","dans un glacier"]
places_sec=["dans le desert","dans les dunes","dans la savane","dans un mesa"]

bestiaire_passif=["cochons","vaches","poules","animaux"]

bestiaire_agressif={
"Loups":{
	"tag":["carnivore","group"],
	"variant":couleur_ternes+couleur_pelage+adj_agressif,
	"places":places_terre_sauvage
},
"Ogres":{
	"tag":["group","meurtrier"],
	"variant":couleur_ternes,
	"places":places_altitude+places_sombres
},
"Gobelins":{
	"tag":["group","meurtrier"],
	"variant":[],
	"places":places_sombres+["dans les marais"]
},
"Slimes":{
	"tag":[],
	"variant":[],
	"places":places_terre_sauvage
},
"Araignées":{
	"tag":[],
	"variant":[],
	"places":places_sombres+["dans les forêt"]
},
"Banshees":{
	"tag":[],
	"variant":[],
	"places":places_sombres
},
"Basilic":{
	"tag":[],
	"variant":[],
	"places":places_sombres+places_glauque
},
"Terreurs mineures":{
	"tag":[],
	"variant":[],
	"places":places_sombres+places_glauque+["en enfer"]
},
"Terreur majeure":{
	"tag":[],
	"variant":[],
	"places":places_sombres+places_glauque+["en enfer"]
},
"Cyclope":{
	"tag":["meurtrier"],
	"variant":[],
	"places":places_sombres+places_altitude
},
"Démon":{
	"tag":["meurtrier"],
	"variant":[],
	"places":places_sombres+places_glauque+["en enfer"]
},
"Djin":{
	"tag":[],
	"variant":[],
	"places":places_terre_sauvage+places_sec
},
"Dragon":{
	"tag":[],
	"variant":[],
	"places":places_altitude+["dans les cavernes"]
},
"Dryades":{
	"tag":[],
	"variant":[],
	"places":places_riviere
},
"Centaures":{
	"tag":["group"],
	"variant":[],
	"places":places_terre_sauvage
},
"Chauves-souris":{
	"tag":["aérien"],
	"variant":[],
	"places":places_sombres+places_glauque
},
"Chimères":{
	"tag":[],
	"variant":[],
	"places":places_sombres
},
"Ectoplasmes":{
	"tag":[],
	"variant":[],
	"places":places_sombres+places_glauque
},
"Elementaires":{
	"tag":["group"],
	"variant":[],
	"places":places_terre_sauvage+places_riviere+places_sec+places_humides+places_froids+places_altitude
},
"Ents":{
	"tag":[],
	"variant":[],
	"places":["dans les forêt","en forêt"]
},
"Fantômes":{
	"tag":["aérien"],
	"variant":[],
	"places":["dans un vieux manoir"]+places_sombres
},
"Farfadets":{
	"tag":["group"],
	"variant":[],
	"places":places_terre_sauvage
},
"Géants":{
	"tag":["group"],
	"variant":[],
	"places":places_terre_sauvage+places_altitude
},
"Génie":{
	"tag":[],
	"variant":[],
	"places":places_sec+["dans les bois"]
},
"Gnomes":{
	"tag":["group"],
	"variant":[],
	"places":places_sombres+places_altitude
},
"Golem":{
	"tag":[],
	"variant":[],
	"places":places_terre_sauvage+places_sombres+places_altitude
},
"Goules":{
	"tag":["meurtrier"],
	"variant":[],
	"places":places_sombres+places_glauque
},
"Gorgones":{
	"tag":["group","meurtrier"],
	"variant":[],
	"places":places_humides+places_glauque
},
"Griffons":{
	"tag":["group"],
	"variant":[],
	"places":places_altitude
},
"Harpies":{
	"tag":["group","meurtrier","aérien"],
	"variant":[],
	"places":places_altitude
},
"Hobgobelins":{
	"tag":["group","meurtrier"],
	"variant":[],
	"places":places_terre_sauvage+places_sombres+["dans les marais"]
},
"Hydre":{
	"tag":[],
	"variant":[],
	"places":["en forêt"]
},
"Kraken":{
	"tag":[],
	"variant":[],
	"places":places_ocean
},
"Lutins":{
	"tag":["group"],
	"variant":[],
	"places":places_terre_sauvage+places_sombres
},
"Manticore":{
	"tag":[],
	"variant":[],
	"places":places_terre_sauvage
},
"Minautore":{
	"tag":[],
	"variant":[],
	"places":places_terre_sauvage+places_altitude
},
"Momies":{
	"tag":["group"],
	"variant":[],
	"places":places_sec+places_glauque
},
"Nymphes":{
	"tag":[],
	"variant":[],
	"places":places_ocean+places_riviere
},
"Ondines":{
	"tag":["marin"],
	"variant":[],
	"places":places_ocean
},
"Orcs":{
	"tag":["group","meurtrier"],
	"variant":[],
	"places":places_terre_sauvage+places_sombres
},
"Revenants":{
	"tag":["group","meurtrier"],
	"variant":[],
	"places":places_glauque
},
"Scorpions":{
	"tag":[],
	"variant":[],
	"places":places_sec
},
"Sirènes":{
	"tag":["group","marin"],
	"variant":[],
	"places":places_ocean
},
"Sorcière":{
	"tag":[],
	"variant":[],
	"places":places_glauque
},
"Spectres":{
	"tag":[],
	"variant":[],
	"places":places_glauque
},
"Sphinx":{
	"tag":[],
	"variant":[],
	"places":places_altitude
},
"Squelettes":{
	"tag":["meurtrier"],
	"variant":[],
	"places":places_sombres+places_glauque
},
"Titan":{
	"tag":[],
	"variant":[],
	"places":places_terre_sauvage+places_altitude
},
"Trolls":{
	"tag":["group","meurtrier"],
	"variant":[],
	"places":places_terre_sauvage+places_froids+places_humides+places_sombres
},
"Vampires":{
	"tag":["group","meurtrier"],
	"variant":[],
	"places":places_sombres+places_glauque
},
"Zombies":{
	"tag":["group","meurtrier"],
	"variant":[],
	"places":places_glauque
}
}


#PHRASES D'ACCROCHE--------------------------------------------------------------
ask_help_exemples=[
	"vous demande de l'aide",
	"demande de l'aide d'un valeureux guerrrier",
	"demande de l'aide d'un mage puissant",
	"demande de l'aide d'un aventurier",
	]

"""
#places------------------------------------------------------------------------------
places_terre_sauvage=["dans les steppes","dans les landes","dans la forêt",'dans le val']
places_terre_urbain=["en ville","dans les parcs","dans les égouts"]
places_ocean=["en eaux tropicales","dans les profondeurs","dans les abysses","dans les récifs"]
places_riviere=["dans les rivières","dans les ruisseaux","dans un fleuve","dans les torrents","dans les fiords"]
places_sombres=["en forêt","dans les cavernes","dans les grottes","dans un gouffre","dans les mines"]
places_glauque=["dans une nécrople","dans les cryptes","dans les égouts"]
places_humides=["dans un marais",'dans une toubière','dans des marigots',"dans la mangrove","dans les rizières"]
places_altitude=["sur la crête","dans les pierriers","dans la montagne","dans les montagnes",]
places_froids=["dans la toundra","dans un glacier"]
places_sec=["dans le desert","dans les dunes","dans la savane","dans un mesa"]
"""

def generate_monster(player_data,quests):
	player_lvl=player_data["level"]
	village_id=player_data["village_id_location"]
	#on récupère les infos du village et de l'environnement (biome)
	with open("multiplayer_infos/villages_data.json","r") as f:
		all_villages=json.load(f)

	village=all_villages[village_id]
	biome=village["cell_info"]["biome"]
	river=False#village["cell_info"]["river"]
	potential_monster=[]

	#on choisi le monstre d'après l'environnement 
	option=choice(["biome","quest"])
	if option=="biome" or len(quests)==0:
		biome_correspondance={
		"Marine":places_ocean,
		"Taiga":places_froids,
		"Temperate deciduous fore":places_terre_sauvage+places_sombres,
		"Grassland":places_terre_sauvage+places_sombres,
		"Temperate rainforest":places_sombres,
		"Wetland":places_sombres+places_humides,
		"Cold desert":places_froids,
		"Tropical rainforest":places_sombres,
		"Tundra":places_sombres,
		"Glacier":places_froids,
		"Hot desert":places_sec,
		"Savanna":places_terre_sauvage+places_sombres+places_sec,
		"Tropical seasonal forest":places_sombres
		}
		for_all=places_glauque
		if river:
			for_all+=places_riviere
		final=biome_correspondance[biome]+for_all
		place_to_select=choice(final)
		for monster in bestiaire_agressif:
			if place_to_select in bestiaire_agressif[monster]["places"]:
				potential_monster+=[monster]
		monster_lvl=randint(player_lvl,player_lvl+2)

	#on choisi le monstre d'après les quêtes du joueur
	else:
		for quest in quests:
			potential_monster+=[quest.objectif[0]]
		monster_lvl=randint(quest.lvl,quest.lvl+1)

	monster=choice(potential_monster)
	#on génère ses stats
	monster_life=round(100*(8.7*sqrt(0.07*monster_lvl)))
	monster_ap=round(monster_lvl*uniform(2,3.5))*10

	return monster,	monster_life, monster_lvl, monster_ap


def create_quest_infos(type_of_quest,tag,giver,objectif,places,nb="None"):
	"""Entrées :
	type_of_quest (str) : kill/collect/escort
	giver (str) : nom du donneur de quête
	objectif : nom  du monstre/objet/plante/pnj à tuer/récolter/aider/parler
	places (str) : nom du places pour trouver les monstres/objets a recolter/pnj avec qui discuter
	nb (str) : nombre de monstre/objets à tuer/recolter vaut "None" par défaut et pour les quêtes de type escort
	Sortie :
	name (str) : le nom de la quête
	description (str) : description de la quête
	"""
	ask_help=choice(ask_help_exemples)


	if type_of_quest=="kill":
		animaux_passif=choice(bestiaire_passif)
		#Nom de quetes par type
		quete_name={
		"kill":["Extermination des "+objectif,"la fin des "+objectif]
		}
		
		quetes_kill={
		"carnivore":[
			[giver+" "+ask_help+" pour chasser les "+objectif+" qui déciment ses "+animaux_passif+". Vous pourrez trouver les "+objectif+" "+places+". Tuez-en "+nb],
			["Protéger les "+animaux_passif+" de "+giver,"Venger les "+animaux_passif,"Venger les "+animaux_passif+" de "+giver,"Aider "+giver]],
		"aggressive":[
			[giver+" "+ask_help+" pour le protéger des "+objectif+" qui sévissent "+places+". D'après "+giver+" il faudrait en tuer "+nb+" pour éliminer la menace.",giver+" "+ask_help+" pour tuer "+nb+" "+objectif+". Après avoir attaqué "+giver+", les "+objectif+" ont fuis "+places+"."],
			["Protégez "+giver,"Au secours de "+giver,"Les peurs de "+giver]],
		"group":[
		["Cela fait maintenant plusieurs jours que des "+nb+" "+objectif+" vagabondent en groupe "+places+". "+giver+" "+ask_help+" afin d'éradiquer la menace."],
		["Chasse aux "+objectif,"Pacification "+places,"Chasse "+places]],
		"meurtrier":[
		["Des "+objectif+" ont été vus "+places+" en train de massacrer ses amis. "+giver+" vous demande de venger ses amis."],
		["Une dette de sang","La vengeance de "+giver,"Le sang des "+objectif]],
		"aérien":[
		["Cela fait maintenant plusieurs semaines qu'environ "+nb+" "+objectif+" nous survolent la nuit rendant toute activité nocture impossible. "+giver+" à besoin d'aide pour rendre la zone plus sûre. Il pense que ces monstres sont "+places+" durant la journée."],
		["Nuit dangereuses","Raids aériens","le repaire des "+objectif]],
		"marin":[
		[giver+" "+ask_help+" car nombre de nos pêcheurs se font pièger et tuer par les "+objectif+". D'après certains, vous pourrez les trouver "+places],
		["A la pêche !","La vengeance des marins"]],
		"eau":[
		[],
		[]],
		"kidnapeur":[
		[],
		[]],
		"maléfice":[
		[],
		[]],
		"voleur":[
		[],
		[]],
		"pilleurs":[
		[],
		[]],
		"complot":[
		[],
		[]],
		"envahisseurs":[
		[],
		[]],
		"herbivore":[
		[],
		[]],
		"effrayant":[
		[],
		[]],

	}
	name = choice(quete_name[type_of_quest]+quetes_kill[tag][1])
	description =choice(quetes_kill[tag][0])

	return name, description

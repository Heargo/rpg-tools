import {selecterNoRepeats, formated, pick} from './generators.tools.js';
import descriptions from '@/assets/json/descriptions.json';

/**
 * It takes a set of stats, a threshold, and a number of passions to select, and returns an array of
 * passions
 * @param [stats] - an object with the stats of the character. The keys are the names of the stats, and
 * the values are the values of the stats.
 * @param [threshold=7] - the minimum value of a stat to be considered for a passion
 * @param [n=2] - number of passions to select
 * @returns An array of strings.
 */
export function passion(stats,threshold=7,n=2)
{
    //for each stats category, select passion based on threshold
    var passionsOptions = descriptions.basic;
    for(let stat in stats)
    {
        if (stats[stat]>=threshold)
        {
            passionsOptions= passionsOptions.concat(descriptions[stat]);
        }
    }
    //select n passions
    var passions = [];
    var selectPassion = selecterNoRepeats(passionsOptions);
    for(let i=0;i<n;i++)
    {
        passions.push(selectPassion());
    }

    return passions;
}

export function description(name,age,gender,stats)
{
    var descriptionGenerated="";
    var descriptionTemplateId = 0; 
    //wealth category
    var familyType="";
    if (stats.wealth>=8) familyType="riche";
    else if(stats.wealth>=6) familyType="aisée";
    else if(stats.wealth>=4) familyType="modeste";
    else familyType="pauvre";

    //baby description 
    if(age<=3)
    {
        //get random baby description
        descriptionTemplateId= Math.floor(Math.random()*descriptions.template.baby[gender].length);
        descriptionGenerated = formated(descriptions.template.baby[gender][descriptionTemplateId],
            {
                name:name,
                age:age,
                face:pick(["plat","rond","oval","carré","en pointe"]),
                eyes:pick(['noirs','marrons','bleus','verts','gris','verts-or','bleu-verts',"vairons, l'un bleu l'autre vert","vairons, l'un marron l'autre vert","vairons, l'un bleu l'autre marron",'rouges','violets']),
                familyWealth:familyType,
                future:pick(['surprenant','incroyable','mystérieux','paisible','mouvementé'])
            }
            );
    }
    else{
        
        var qualificatif_age;
        //get gender related age description
        if(gender=="girl"){
            if (age <12) qualificatif_age='enfant';
            else if (age <18) qualificatif_age='adolescent';
            else if (age <25) qualificatif_age='jeune femme';
            else if (age <65) qualificatif_age='femme';
            else qualificatif_age='vieille femme';
        }else{
            if (age <12) qualificatif_age='enfant';
            else if (age <18) qualificatif_age='adolescent';
            else if (age <25) qualificatif_age='jeune homme';
            else if (age <65) qualificatif_age='homme';
            else qualificatif_age='vieil homme';
        }

        //feeling face
        var formeVisage= pick(descriptions.feelings.positive.concat(descriptions.feelings.negative));

        //get phrase depending on feeling face
        var phrase = pick(descriptions.transitions.introducePositive);
        if(descriptions.feelings.negative.includes(formeVisage)) phrase = pick(descriptions.transitions.introduceNegative);

        //get 2 passion
        var passions = passion(stats);
        //pick a random passion
        var passionX = pick(passions);

        //get possible mental traits
        var optionsMentalTrait = descriptions.mentalTraits.default;
        //intelligence
        if(stats.intelligence>=7) optionsMentalTrait = optionsMentalTrait.concat(descriptions.mentalTraits.intelligence);
        //strength
        if(stats.strength>=7) optionsMentalTrait = optionsMentalTrait.concat(descriptions.mentalTraits.strength);
        //creativity
        if(stats.creativity>=7) optionsMentalTrait = optionsMentalTrait.concat(descriptions.mentalTraits.creativity);


        var data = {   
            name:name,
            age:age,
            qualificatif_age:qualificatif_age,
            couleurCheveux:pick(descriptions.physicalTraits.hairColor),
            formeCheveux:pick(descriptions.physicalTraits.hairShape[gender]),
            coupeCheveux:pick(descriptions.physicalTraits.hairCut[gender]),
            transition1:pick(descriptions.transitions.physicalImpact),
            formeVisage:pick(descriptions.physicalTraits.faceShape),
            sentimentVisage:formeVisage,
            couleurYeux:pick(descriptions.physicalTraits.eyeColor),
            formeYeux:pick(descriptions.physicalTraits.eyeShape),
            passion1:passions[0],
            passion2:passions[1],
            phrase:phrase,
            adjectif:pick(descriptions.adjectives),
            passionX:passionX,
            caracteristique_sociale:pick(optionsMentalTrait),
            familyWealth:familyType,
        }

        //get random standard description
        descriptionTemplateId = Math.floor(Math.random()*descriptions.template.default[gender].length);
        descriptionGenerated = formated(descriptions.template.default[gender][descriptionTemplateId],data );
    }

    //standard description 


    return descriptionGenerated;
    
}
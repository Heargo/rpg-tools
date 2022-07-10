
function niemeDay(day,month,year){
    var nb_j=0;
    var liste_mois;
    if (year%4==0 && year%100!=0 || year%400==0) {
        liste_mois=[31,29,31,30,31,30,31,31,30,31,30,31];
    } else {
        liste_mois=[31,28,31,30,31,30,31,31,30,31,30,31];
    }
    for (var i=0;i<month-1;i++) {
        nb_j+=liste_mois[i];
    }
    return nb_j+day;
}

export function astroSign(day,month,year){
    var sign ="";
    if (niemeDay(21,3,year)<=niemeDay(day,month,year)<=niemeDay(20,4,year)) {
        sign ="Bélier";
    }
    else if (niemeDay(21,4,year)<=niemeDay(day,month,year)<=niemeDay(21,5,year)) {
        sign ="Taureau";
    }
    else if (niemeDay(22,5,year)<=niemeDay(day,month,year)<=niemeDay(21,6,year)) {
        sign ="Gémeaux";
    }
    else if (niemeDay(22,6,year)<=niemeDay(day,month,year)<=niemeDay(22,7,year)) {
        sign ="Cancer";
    }
    else if (niemeDay(23,7,year)<=niemeDay(day,month,year)<=niemeDay(22,8,year)) {
        sign ="Lion";
    }
    else if (niemeDay(23,8,year)<=niemeDay(day,month,year)<=niemeDay(22,9,year)) {
        sign ="Vierge";
    }
    else if (niemeDay(23,9,year)<=niemeDay(day,month,year)<=niemeDay(22,10,year)) {
        sign ="Balance";
    }
    else if (niemeDay(23,10,year)<=niemeDay(day,month,year)<=niemeDay(22,11,year)) {
        sign ="Scorpion";
    }
    else if (niemeDay(23,11,year)<=niemeDay(day,month,year)<=niemeDay(21,12,year)) {
        sign ="Sagittaire";
    }
    else if (niemeDay(22,12,year)<=niemeDay(day,month,year)<=niemeDay(21,1,year+1)) {
        sign ="Capricorne";
    }
    else if (niemeDay(22,1,year+1)<=niemeDay(day,month,year+1)<=niemeDay(21,2,year+1)) {
        sign ="Verseau";
    }
    else if (niemeDay(22,2,year+1)<=niemeDay(day,month,year+1)<=niemeDay(20,3,year+1)) {
        sign ="Poissons";
    }
    return sign;
}
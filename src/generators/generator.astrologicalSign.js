
function nieme_day(day,month,year){
    var nb_j=0;
    if (year%4==0 && year%100!=0 || year%400==0) {
        var liste_mois=[31,29,31,30,31,30,31,31,30,31,30,31];
    } else {
        var liste_mois=[31,28,31,30,31,30,31,31,30,31,30,31];
    }
    for (var i=0;i<month-1;i++) {
        nb_j+=liste_mois[i];
    }
    return nb_j+day;
}

export function astro_sign(day,month,year){
    var sign ="";
    if (nieme_day(21,3,year)<=nieme_day(day,month,year)<=nieme_day(20,4,year)) {
        sign ="Bélier";
    }
    else if (nieme_day(21,4,year)<=nieme_day(day,month,year)<=nieme_day(21,5,year)) {
        sign ="Taureau";
    }
    else if (nieme_day(22,5,year)<=nieme_day(day,month,year)<=nieme_day(21,6,year)) {
        sign ="Gémeaux";
    }
    else if (nieme_day(22,6,year)<=nieme_day(day,month,year)<=nieme_day(22,7,year)) {
        sign ="Cancer";
    }
    else if (nieme_day(23,7,year)<=nieme_day(day,month,year)<=nieme_day(22,8,year)) {
        sign ="Lion";
    }
    else if (nieme_day(23,8,year)<=nieme_day(day,month,year)<=nieme_day(22,9,year)) {
        sign ="Vierge";
    }
    else if (nieme_day(23,9,year)<=nieme_day(day,month,year)<=nieme_day(22,10,year)) {
        sign ="Balance";
    }
    else if (nieme_day(23,10,year)<=nieme_day(day,month,year)<=nieme_day(22,11,year)) {
        sign ="Scorpion";
    }
    else if (nieme_day(23,11,year)<=nieme_day(day,month,year)<=nieme_day(21,12,year)) {
        sign ="Sagittaire";
    }
    else if (nieme_day(22,12,year)<=nieme_day(day,month,year)<=nieme_day(21,1,year+1)) {
        sign ="Capricorne";
    }
    else if (nieme_day(22,1,year+1)<=nieme_day(day,month,year+1)<=nieme_day(21,2,year+1)) {
        sign ="Verseau";
    }
    else if (nieme_day(22,2,year+1)<=nieme_day(day,month,year+1)<=nieme_day(20,3,year+1)) {
        sign ="Poissons";
    }
    return sign;
}
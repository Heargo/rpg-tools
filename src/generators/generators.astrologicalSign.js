
function niemeDaySinceYear0(day,month,year){
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
    return nb_j+day+365*year;
}

function isBetweenDates(d1,d2,d3){
    //a date is in format [day,month,year]
    var d1_nb=niemeDaySinceYear0(d1[0],d1[1],d1[2]);
    var d2_nb=niemeDaySinceYear0(d2[0],d2[1],d2[2]);
    var d3_nb=niemeDaySinceYear0(d3[0],d3[1],d3[2]);
    return d1_nb<=d2_nb && d2_nb<=d3_nb;

}

export function astroSign(day,month,year){
    var sign ="";
    if (isBetweenDates([21,3,year],[day,month,year],[20,4,year])) {
        sign ="Bélier";
    }
    if (isBetweenDates([21,4,year],[day,month,year],[21,5,year])) {
        sign ="Taureau";
    }
    if (isBetweenDates([22,5,year],[day,month,year],[21,6,year])) {
        sign ="Gémeaux";
    }
    if (isBetweenDates([22,6,year],[day,month,year],[22,7,year])) {
        sign ="Cancer";
    }
    if (isBetweenDates([23,7,year],[day,month,year],[22,8,year])) {
        sign ="Lion";
    }
    if (isBetweenDates([23,8,year],[day,month,year],[22,9,year])) {
        sign ="Vierge";
    }
    if (isBetweenDates([23,9,year],[day,month,year],[22,10,year])) {
        sign ="Balance";
    }
    if (isBetweenDates([23,10,year],[day,month,year],[22,11,year])) {
        sign ="Scorpion";
    }
    if (isBetweenDates([23,11,year],[day,month,year],[22,12,year])) {
        sign ="Sagittaire";
    }
    if (isBetweenDates([23,12,year-1],[day,month,year],[21,1,year])) {
        sign ="Capricorne";
    }
    if (isBetweenDates([22,1,year+1],[day,month,year+1],[20,2,year+1])) {
        sign ="Verseau";
    }
    if (isBetweenDates([21,2,year+1],[day,month,year+1],[19,3,year+1])) {
        sign ="Poissons";
    }

    return sign;
}
function getChoiceIndex(choice) {

    if (choice === 0) return 0;
    if (choice === 1) return 1;

    const teen = choice > 10 && choice < 20;
    const endsWithTwoThreeOrFour = (choice % 10 >= 2 && choice % 10 <= 4);

    if (teen || (!teen && !endsWithTwoThreeOrFour)) return 3;
    return 2;
}
// 0 bananów
// 1 banan
// 2-4 banany
// 5+ bananów
//  {
//     n: liczba ile bananów,
//     values: tablica odmian
// }
export function pluralize(obj){
    if(!obj.n || isNaN(obj.n)) return 'INVALID_N_PROPERTY';
    const x = getChoiceIndex(obj.n);

    if(obj.values && Array.isArray(obj.values)){

        if(x < obj.values.length) return obj.values[x].replace('{{n}}', obj.n);
        else return 'INVALID_VALUES_LENGTH';

    }
    else return 'NO_TRANSLATION_DATA';
}

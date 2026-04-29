/**
 * Created by thomasschuessler on 31.03.16.
 */

var glieder = {
    /* Arm Links */
    1: {
        name: "Arm links",
        selected: false,
        optionId: "1",
        group: 1,
        parentGroup: false,
        affectedIds: [1,2,3,4,5,6,7,8,9],
        hasBigImage: true
    },
    2: {
        name: "Arm bis oberhalb Ellenbogen links",
        selected: false,
        optionId: "2",
        group: 1,
        parentGroup: false,
        affectedIds: [1,2,3,4,5,6,7,8,9],
        hasBigImage: true
    },
    3: {
        name: "Arm unterhalb Ellenbogen links",
        selected: false,
        optionId: "3",
        group: 1,
        parentGroup: false,
        affectedIds: [1,2,3,4,5,6,7,8,9],
        hasBigImage: true
    },
    4: {
        name: "Hand links",
        selected: false,
        optionId: "4",
        group: 1,
        parentGroup: false,
        affectedIds: [1,2,3,4,5,6,7,8,9]
    },
    5: {
        name: "Daumen links",
        selected: false,
        optionId: "5",
        group: false,
        parentGroup: 1,
        affectedIds: [1,2,3,4,5]
    },
    6: {
        name: "Zeigefinger links",
        selected: false,
        optionId: "6",
        group: false,
        parentGroup: 1,
        affectedIds: [1,2,3,4,6]
    },
    7: {
        name: "Mittelfinger links",
        selected: false,
        optionId: "7",
        group: 3,
        parentGroup: 1,
        affectedIds: [1,2,3,4,7]
    },
    8: {
        name: "Ringfinger links",
        selected: false,
        optionId: "7",
        group: 3,
        parentGroup: 1,
        affectedIds: [1,2,3,4,8]
    },
    9: {
        name: "kleiner Finger links",
        selected: false,
        optionId: "7",
        group: 3,
        parentGroup: 1,
        affectedIds: [1,2,3,4,9]
    },


    /* Arm rechts */
    10: {
        name: "Arm rechts",
        selected: false,
        optionId: "1",
        group: 2,
        parentGroup: false,
        affectedIds: [10,11,12,13,14,15,16,17,18],
        hasBigImage: true
    },
    11: {
        name: "Arm bis oberhalb Ellenbogen rechts",
        selected: false,
        optionId: "2",
        group: 2,
        parentGroup: false,
        affectedIds: [10,11,12,13,14,15,16,17,18],
        hasBigImage: true
    },
    12: {
        name: "Arm unterhalb Ellenbogen rechts",
        selected: false,
        optionId: "3",
        group: 2,
        parentGroup: false,
        affectedIds: [10,11,12,13,14,15,16,17,18],
        hasBigImage: true
    },
    13: {
        name: "Hand rechts",
        selected: false,
        optionId: "4",
        group: 2,
        parentGroup: false,
        affectedIds: [10,11,12,13,14,15,16,17,18]
    },
    14: {
        name: "Daumen rechts",
        selected: false,
        optionId: "5",
        group: false,
        parentGroup: 2,
        affectedIds: [10,11,12,13,14]
    },
    15: {
        name: "Zeigefinger rechts",
        selected: false,
        optionId: "6",
        group: false,
        parentGroup: 2,
        affectedIds: [10,11,12,13,15]
    },
    16: {
        name: "Mittelfinger rechts",
        selected: false,
        optionId: "7",
        group: 4,
        parentGroup: 2,
        affectedIds: [10,11,12,13,16]
    },
    17: {
        name: "Ringfinger rechts",
        selected: false,
        optionId: "7",
        group: 4,
        parentGroup: 2,
        affectedIds: [10,11,12,13,17]
    },
    18: {
        name: "kleiner Finger rechts",
        selected: false,
        optionId: "7",
        group: 4,
        parentGroup: 2,
        affectedIds: [10,11,12,13,18]
    },

    /* Bein Links */
    19: {
        name: "Bein über Mitte Oberschenkel links",
        selected: false,
        optionId: "8",
        group: 5,
        parentGroup: false,
        affectedIds: [19,20,21,22,23,24,25,26,27,28],
        hasBigImage: true
    },
    20: {
        name: "Bein bis Mitte Oberschenkel links",
        selected: false,
        optionId: "9",
        group: 5,
        parentGroup: false,
        affectedIds: [19,20,21,22,23,24,25,26,27,28],
        hasBigImage: true
    },
    21: {
        name: "Bein bis unterhalb Knies links",
        selected: false,
        optionId: "10",
        group: 5,
        parentGroup: false,
        affectedIds: [19,20,21,22,23,24,25,26,27,28],
        hasBigImage: true
    },
    22: {
        name: "Bein bis Mitte Unterschenkel links",
        selected: false,
        optionId: "11",
        group: 5,
        parentGroup: false,
        affectedIds: [19,20,21,22,23,24,25,26,27,28],
        hasBigImage: true
    },
    23: {
        name: "Fuß links",
        selected: false,
        optionId: "12",
        group: 5,
        parentGroup: false,
        affectedIds: [19,20,21,22,23,24,25,26,27,28]
    },
    24: {
        name: "Große Zehe links",
        selected: false,
        optionId: "13",
        group: false,
        parentGroup: 5,
        affectedIds: [19,20,21,22,23,24]
    },
    25: {
        name: "Zehe 2 links",
        selected: false,
        optionId: "14",
        group: 7,
        parentGroup: 5,
        affectedIds: [19,20,21,22,23,25]
    },
    26: {
        name: "Zehe 3 links",
        selected: false,
        optionId: "14",
        group: 7,
        parentGroup: 5,
        affectedIds: [19,20,21,22,23,26]
    },
    27: {
        name: "Zehe 4 links",
        selected: false,
        optionId: "14",
        group: 7,
        parentGroup: 5,
        affectedIds: [19,20,21,22,23,27]
    },
    28: {
        name: "Zehe 5 (kleiner) links",
        selected: false,
        optionId: "14",
        group: 7,
        parentGroup: 5,
        affectedIds: [19,20,21,22,23,28]
    },



    /* Bein Rechts */
    29: {
        name: "Bein über Mitte Oberschenkel rechts",
        selected: false,
        optionId: "8",
        group: 6,
        parentGroup: false,
        affectedIds: [29,30,31,32,33,34,35,36,37,38],
        hasBigImage: true
    },
    30: {
        name: "Bein bis Mitte Oberschenkel rechts",
        selected: false,
        optionId: "9",
        group: 6,
        parentGroup: false,
        affectedIds: [29,30,31,32,33,34,35,36,37,38],
        hasBigImage: true
    },
    31: {
        name: "Bein bis unterhalb Knies rechts",
        selected: false,
        optionId: "10",
        group: 6,
        parentGroup: false,
        affectedIds: [29,30,31,32,33,34,35,36,37,38],
        hasBigImage: true
    },
    32: {
        name: "Bein bis Mitte Unterschenkel rechts",
        selected: false,
        optionId: "11",
        group: 6,
        parentGroup: false,
        affectedIds: [29,30,31,32,33,34,35,36,37,38],
        hasBigImage: true
    },
    33: {
        name: "Fuß rechts",
        selected: false,
        optionId: "12",
        group: 6,
        parentGroup: false,
        affectedIds: [29,30,31,32,33,34,35,36,37,38],
    },
    34: {
        name: "Große Zehe rechts",
        selected: false,
        optionId: "13",
        group: false,
        parentGroup: 6,
        affectedIds: [29,30,31,32,33,34]
    },
    35: {
        name: "Zehe 2 rechts",
        selected: false,
        optionId: "14",
        group: 8,
        parentGroup: 6,
        affectedIds: [29,30,31,32,33,35]
    },
    36: {
        name: "Zehe 3 rechts",
        selected: false,
        optionId: "14",
        group: 8,
        parentGroup: 6,
        affectedIds: [29,30,31,32,33,36]
    },
    37: {
        name: "Zehe 4 rechts",
        selected: false,
        optionId: "14",
        group: 8,
        parentGroup: 6,
        affectedIds: [29,30,31,32,33,37]
    },
    38: {
        name: "Zehe 5 (kleiner) rechts",
        selected: false,
        optionId: "14",
        group: 8,
        parentGroup: 6,
        affectedIds: [29,30,31,32,33,38]
    },

    /* Kopf */
    39: {
        name: "Auge links",
        selected: false,
        optionId: "15",
        group: 9,
        parentGroup: false,
        affectedIds: [39]
    },
    40: {
        name: "Auge rechts",
        selected: false,
        optionId: "15",
        group: 9,
        parentGroup: false,
        affectedIds: [40]
    },
    41: {
        name: "Ohr links",
        selected: false,
        optionId: "16",
        group: 10,
        parentGroup: false,
        affectedIds: [41]
    },
    42: {
        name: "Ohr rechts",
        selected: false,
        optionId: "16",
        group: 10,
        parentGroup: false,
        affectedIds: [42]
    },
    43: {
        name: "Stimmbänder",
        selected: false,
        optionId: "17",
        group: false,
        parentGroup: false,
        affectedIds: [43]
    },
    44: {
        name: "Nase",
        selected: false,
        optionId: "18",
        group: false,
        parentGroup: false,
        affectedIds: [44]
    },
    45: {
        name: "Mund",
        selected: false,
        optionId: "19",
        group: false,
        parentGroup: false,
        affectedIds: [45]
    },
    46: {
        name: "Niere links",
        selected: false,
        optionId: "20",
        group: 10,
        parentGroup: false,
        affectedIds: [46]
    },
    47: {
        name: "Niere rechts",
        selected: false,
        optionId: "20",
        group: 10,
        parentGroup: false,
        affectedIds: [47]
    },
    48: {
        name: "Milz",
        selected: false,
        optionId: "21",
        group: false,
        parentGroup: false,
        affectedIds: [48]
    },

}

















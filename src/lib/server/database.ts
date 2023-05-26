const db = {
    reels: [
        {id: 1, title: "Cuntais ar Logainmneacha i bParóiste Chairlinn, Co. Lú", refId: 1, dates: "1961", collectors: [1, 2], note: "3 3/4 ips"},
        {id: 2, title: "Cuntais ar Logainmneacha i bParóiste Chairlinn, Co. Lú", refId: 2, dates: "1962", collectors: [1], note: "1 7/8 ips"},
        {id: 3, title: "Cuntais ar Logainmneacha i mBarúntacht na nDéise laistigh den Drom, Co. Phort Láirge", refId: 3, dates: "1962", collectors: [1, 3], note: "1 7/8 ips"},

    ],
    collectors: [
        {id: 1, name: {first: 'Art', last: 'Maolfabhail'}},
        {id: 2, name: {first: 'Éamonn', last: 'de hÓir'}},
        {id: 3, name: {first: 'Cionath', last: 'Bale'}},
    ],
    speakers: [
        {id: 1, gender: "M", name: {full: 'Peadar Ó Sluagháin', first: 'Peadar', last: 'Ó Sluagháin'}},
        {id: 2, gender: "F", name: {full: 'Bean Uí Anluáin', first: '', last: 'Uí Anluáin'}},
        {id: 3, gender: "M", name: {full: 'Pádraig Cionnáith', first: 'Pádraig', last: 'Cionnaith'}},
],
    tracks: [
        {id: 1, nickname: '1a1', catalogueEntry: "", places: [132329], recordingDate: '1961-03', speakers: [1], languages: [], reels: [1]},
        {id: 2, nickname: '1b1', catalogueEntry: "", places: [132329], recordingDate: '1961-03', speakers: [1, 2], languages: [], reels: [1]},
        {id: 3, nickname: '2a1', catalogueEntry: "", places: [132329], recordingDate: '1962-09-06', speakers: [1], languages: [], reels: [2]},
    ],
}
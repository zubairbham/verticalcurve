const form = document.querySelector('form');
//Dropdowns
const curveType = document.querySelector('#curve-type');
const designSpeed = document.querySelector('#design-speed');
const finalGrade = document.querySelector('#final-grade');
//Inputs
const initialGrade = document.querySelector('#initial-grade');
const lowPointElevation = document.querySelector('#low-point-elevation');
const lowPointStation = document.querySelector('#low-point-station');
const endOfVerticalCurve = document.querySelector('#end-of-vertical-curve');
//Output Texts
const kValue = document.querySelector('#k-value-text');
const xhl = document.querySelector('#xhl-text');
const BVCStText = document.querySelector('#bvc-st-text');
const BVCElText = document.querySelector('#bvc-el-text');
const EVCStText = document.querySelector('#evc-st-text');
const EVCElText = document.querySelector('#evc-el-text');
const gTwo = document.querySelector('#g-two');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    //Dropdown Values
    const curveTypeValue = curveType.value;
    const designSpeedValue = parseFloat(designSpeed.value);
    const finalGradeValue = finalGrade.value;
    //Inputs Values
    const initialGradeValue = parseFloat(initialGrade.value);
    const lowPointElevationValue = parseFloat(lowPointElevation.value);
    const lowPointStationValue = parseFloat(lowPointStation.value);
    const endOfVerticalCurveValue = parseFloat(endOfVerticalCurve.value);

    //For K-Value
    //Whent Crest is selected

    //To print K-Value
    let k;
    if (curveTypeValue == 'Crest') {
        if (designSpeedValue === 15) {
            k = 3;
        } else if (designSpeedValue === 20) {
            k = 7;
        } else if (designSpeedValue === 25) {
            k = 12;
        } else if (designSpeedValue === 30) {
            k = 19;
        } else if (designSpeedValue === 35) {
            k = 29;
        } else if (designSpeedValue === 40) {
            k = 44;
        } else if (designSpeedValue === 45) {
            k = 61;
        } else if (designSpeedValue === 50) {
            k = 84;
        } else if (designSpeedValue === 55) {
            k = 114;
        } else if (designSpeedValue === 60) {
            k = 151;
        } else if (designSpeedValue === 65) {
            k = 193;
        } else if (designSpeedValue === 70) {
            k = 247;
        } else if (designSpeedValue === 75) {
            k = 312;
        } else if (designSpeedValue === 80) {
            k = 384;
        }
        //When Sag is selected    
    } else if (curveTypeValue == 'Sag') {
        if (designSpeedValue === 15) {
            k = 10;
        } else if (designSpeedValue === 20) {
            k = 17;
        } else if (designSpeedValue === 25) {
            k = 26;
        } else if (designSpeedValue === 30) {
            k = 37;
        } else if (designSpeedValue === 35) {
            k = 49;
        } else if (designSpeedValue === 40) {
            k = 64;
        } else if (designSpeedValue === 45) {
            k = 79;
        } else if (designSpeedValue === 50) {
            k = 96;
        } else if (designSpeedValue === 55) {
            k = 115;
        } else if (designSpeedValue === 60) {
            k = 136;
        } else if (designSpeedValue === 65) {
            k = 157;
        } else if (designSpeedValue === 70) {
            k = 181;
        } else if (designSpeedValue === 75) {
            k = 206;
        } else if (designSpeedValue === 80) {
            k = 231;
        }
    }
    kValue.innerHTML = "<b>KValue:</b>" + " " + k;

    let xhlValue = k * initialGradeValue;
    if (xhlValue < 0) {
        xhlValue = -1 * xhlValue;
    }
    if (curveTypeValue == 'Crest') {
        xhl.innerHTML = "<b>Distance of high point from BVC (Xhl):</b>" + " " + xhlValue + " " + "ft";
    } else if (curveTypeValue == 'Sag') {
        xhl.innerHTML = "<b>Distance of low point from BVC (Xhl):</b>" + " " + xhlValue + " " + "ft";
    }

    //To print  BVC Station 
    let BVCStValue = parseFloat(lowPointStationValue - xhlValue).toFixed(2);
    BVCStText.innerHTML = "<b>BVC Station:</b>" + " " + BVCStValue;


    let BVCElevationValue = parseFloat(lowPointElevationValue - ((1 / (2 * k)) * (xhlValue) ** 2) - (initialGradeValue * xhlValue)).toFixed(2);
    BVCElText.innerHTML = "<b>BVC Elevation:</b>" + " " + BVCElevationValue;




    //To Print EVC Station
    let b = initialGradeValue;
    let a = 1 / (2 * k);
    let c = BVCElevationValue - endOfVerticalCurveValue;

    let curveLength1 = parseFloat((-b + Math.sqrt(b ** 2 - (4 * a * c))) / (2 * a)).toFixed(2);
    let curveLength2 = parseFloat((-b - Math.sqrt(b ** 2 - (4 * a * c))) / (2 * a)).toFixed(2);

    let gTwoOne = parseFloat((curveLength1 / k) + initialGradeValue).toFixed(2);
    let gTwoTwo = parseFloat((curveLength2 / k) + initialGradeValue).toFixed(2);

    let EVCStValue1 =  curveLength1 + BVCStValue;
    let EVCStValue2 =  curveLength2 + BVCStValue; 
    console.log(EVCStValue1);
    console.log(EVCStValue2);
    if (finalGradeValue == "Positive") {
        if (gTwoOne > 0) {
            EVCStText.innerHTML = "<b>EVC Station:</b>  " +  EVCStValue1;
            EVCElText.innerHTML = "<b>EVC Elevation:</b> " + endOfVerticalCurveValue;
            gTwo.innerHTML = "<b>Final Grade: </b>" + gTwoOne;
        } else if (gTwoTwo > 0) {
            EVCStText.innerHTML = "<b>EVC Station:</b>  " + EVCStValue2;
            EVCElText.innerHTML = "<b>EVC Elevation:</b> " + endOfVerticalCurveValue;
            gTwo.innerHTML = "<b>Final Grade: </b>" + gTwoTwo;

        }
    } else if (finalGradeValue == "Negative") {
        if (gTwoOne < 0) {
            EVCStText.innerHTML = "<b>EVC Station:</b>  " + EVCStValue1
            EVCElText.innerHTML = "<b>EVC Elevation:</b> " + endOfVerticalCurveValue;
            gTwoe.innerHTML = "<b>Final Grade: </b>" + gTwoOne;
        } else if (gTwoTwo < 0) {
            EVCStText.innerHTML = "<b>EVC Station:</b>   " + EVCStValue2;
            EVCElText.innerHTML = "<b>EVC Elevation:</b> " + endOfVerticalCurveValue;
            gTwo.innerHTML = "<b>Final Grade: </b>" + gTwoTwo;
        }
    }
    // form.reset();
});


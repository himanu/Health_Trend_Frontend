import DecreaseIcon from "./DecreaseIcon";
import IncreaseIcon from "./IncreaseIcon";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const HealthInsight = ({ increase, parameter, percentageChange, normalRange, lastTest, currentTest }) => {
    return (
        <div style={{
            marginTop: "20px",
            borderRadius: "5px",
            background: "#fff",
            padding: "8px 10px"
        }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >

                <div
                    style={{
                        color: "#000",
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "19.356px",
                        flex: 1
                    }}
                >
                    <spna style={{ color: "var(--Colour-Palette-Secondary-Error-R800, #CC4C4E)" }}> {increase ? "High" : "Low"} </spna>
                    {parameter}
                </div>
                <div
                    style={{
                        backgroundColor: "var(--Colour-Palette-Secondary-Warning-O200, #FFC9A0)",
                        borderRadius: "4px",
                        color: "var(--Colour-Palette-Secondary-Warning-O1000, #784C2A)",
                        fontFamily: "Inter",
                        fontSize: "10px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "16px", /* 160% */
                        textTransform: "uppercase",
                        display: "flex",
                        alignItems: "center",
                        padding: "5px 10px",
                        justifyContent: "center"
                    }}
                >
                    Rapid {increase ? "increase" : "decrease"}

                </div>
            </div>

            <div style={{ fontSize: "10px" }}>
                <IncreaseIcon color="red" />
                <span style={{ marginLeft: "8px" }}>Rapid {increase ? "Increase" : "Decrease"} by {percentageChange}%</span>
                <span> </span>
            </div>

        </div>
    )
};
const Highlighter = ({text}) => (
    <div
        style={{
            backgroundColor: "#F6E4AB",
            borderRadius: "4px",
            color: "var(--Colour-Palette-Secondary-Warning-O1000, #784C2A)",
            fontFamily: "Inter",
            fontSize: "10px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "16px", /* 160% */
            textTransform: "uppercase",
            display: "inline",
            alignItems: "center",
            padding: "5px 10px",
            justifyContent: "center",
            marginBottom: "10px"
        }}
    >
        {text}

    </div>
)
const RiskHeading = ({isHigh, parameter}) => (
    <>
        <span style={{ color: "#CC4C4E"}}> {isHigh ? "High" : "Low"} </span> <span> {parameter} </span>
    </>
)
const NonRiskHeading = ({ parameter }) => (
    <>
        <span> Woohoo Great News 🎉 </span>
    </>
)

const NonRiskSubHeading = ({parameter}) => (
    <>
        <span> {parameter} & other profiles are </span>
        <span style={{
            color: "#45A081",
            fontWeight: 500
        }}> IN RANGE </span>
    </>
);

const RiskSubHeading = ({ hasPastRecord, lowerLimit, higherLimit, increased, change, unit  }) => (
    <div style={{
        display: "flex",
        gap: "10px"
    }}>
        {hasPastRecord && (
            <div>
                <span>{increased ? <IncreaseIcon color="red" /> : <DecreaseIcon color="red" />} </span>
                <span> {increased ? "Increased" : "Decreased"} by {change}% </span>
            </div>
        )}
        <span style={{ color: "#6E787E"}}>
            Normal Range: {lowerLimit} - {higherLimit} {unit}
        </span>
    </div>
);
const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false, // Hide the legend
        },
    }
};
const Separator = () => (
    <div style={{
        height: "8px",
        background: "#EDF2F9",
    }}></div>
)
const RapidIncrease = () => {
    let orderDueDate = '12 Jan, 2024', retestLink = '';
    const hasRisk = true;
    const parameter = "LDL Cholesterol - Direct";
    const result = [{
        date: "5 Jan, 23",
        value: "23"
    }, {
        date: "15 Mar, 23",
        value: "19"
    }, {
        date: "15 Aug, 23",
        value: "24"
    }, {
        date: "23 Dec, 23",
        value: "34"
    }];
    const lowerLimit = 0, higherLimit = 25;
    const unit = "mg/dl";

    const isHigh = result?.length ? result[result?.length - 1]?.value > higherLimit : false
    let change;
    if (result?.length > 1) {
        const oldestResult = result[0].value, latestResult = result[result?.length - 1].value;
        change = Number((latestResult - oldestResult)/oldestResult).toFixed(2) * 100;
    }
    const data = {
        labels: result?.map((item) => item.date),
        datasets: [
            {
                data: result?.map((item) => item.value),
                borderColor: hasRisk ? '#CC4C4E' : "#45A081",
                borderWidth: 5,
                lineTension: 0.6

            }
        ],
    };
    const suggestedProductLink = "#"
    return (
        <div>
            {hasRisk && <Highlighter text="NEW RISK FOUND" />}
            <div
                style={{
                    fontFamily: "Inter",
                    fontSize: "16px",
                    fontStyle: "normal",
                    fontWeight: "600",
                    marginTop: "8px"
                }}
            >
                {hasRisk ? <RiskHeading isHigh={isHigh} parameter={parameter} /> : <NonRiskHeading />}
            </div>
            <div
                style={{
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: "500"
                }}
            >
                {hasRisk ? <RiskSubHeading hasPastRecord={result?.length > 1} lowerLimit={lowerLimit} higherLimit={higherLimit} increased={change ? change > 0 : false} change={Math.abs(change)} unit={unit}  /> : <NonRiskSubHeading parameter={parameter} />}
            </div>
            <Line options={options} data={data} />
            {orderDueDate && (
                <>
                <Separator />
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around"
                    }}
                >
                    <div 
                        style={{
                            fontSize: "14px",
                            fontStyle: "normal",
                            fontWeight: 500
                        }}
                    > Test Due on {orderDueDate}</div>
                    <button style={{
                        padding: "8px 10px",
                        background: "#10847E",
                        borderRadius: "8px",
                        color: "#fff",
                        borderColor: "transparent"
                    }}> <a href="#"> </a>Retest </button>
                </div>
                <Separator />
                </>
            )}
            {!orderDueDate && suggestedProductLink && (
                <>
                    <Separator />
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around"
                        }}
                    >
                        <div
                            style={{
                                fontSize: "14px",
                                fontStyle: "normal",
                                fontWeight: 500
                            }}
                        > Buy essentials to maintain body vitals</div>
                        <button style={{
                            padding: "8px 10px",
                            background: "#10847E",
                            borderRadius: "8px",
                            color: "#fff",
                            borderColor: "transparent"
                        }}> <a href={suggestedProductLink}> </a>Browse </button>
                    </div>
                    <Separator />
                </>
            )}
        </div>
    )
};
export default RapidIncrease;

import { useEffect, useState } from "react";
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
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import formatDate from "../utils/date-format";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const Highlighter = ({ text }) => (
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
const RiskHeading = ({ isHigh, parameter }) => (
    <>
        <span style={{ color: "#CC4C4E" }}> {isHigh ? "High" : "Low"} </span> <span> {parameter} </span>
    </>
)
const NonRiskHeading = ({ parameter }) => (
    <>
        <span> Woohoo Great News 🎉 </span>
    </>
)

const NonRiskSubHeading = ({ parameter }) => (
    <>
        <span> {parameter} & other profiles are </span>
        <span style={{
            color: "#45A081",
            fontWeight: 500
        }}> IN RANGE </span>
    </>
);

const RiskSubHeading = ({ hasPastRecord, lowerLimit, higherLimit, increased, change, unit }) => (
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
        <span style={{ color: "#6E787E" }}>
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
const patient_id = 1086;
const RapidIncrease = () => {
    const [orderDueDate, setOrderDueDate] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [retestLink, setReTestLink] = useState("");
    const [hasRisk, setHasRisk] = useState("");
    const [parameter, setParameter] = useState("");
    const [result, setResult] = useState("");
    const [lowerLimit, setLowerLimit] = useState("");
    const [upperLimit, setUpperLimit] = useState("");
    const [unit, setUnit] = useState("");
    const [isHigh, setIsHigh] = useState("");
    const [suggestedProductLink, setProductLink] = useState("");
    // const result = [{
    //     date: "5 Jan, 23",
    //     value: "23"
    // }, {
    //     date: "15 Mar, 23",
    //     value: "19"
    // }, {
    //     date: "15 Aug, 23",
    //     value: "24"
    // }, {
    //     date: "23 Dec, 23",
    //     value: "34"
    // }];

    let change;
    if (result?.length > 1) {
        const oldestResult = result[0].value, latestResult = result[result?.length - 1].value;
        change = Number((latestResult - oldestResult) / oldestResult).toFixed(2) * 100;
    }
    const data = {
        labels: result.length > 0 && result?.map((item) => formatDate(item.date)),
        datasets: [
            {
                data: result.length > 0 && result?.map((item) => item.value),
                borderColor: hasRisk ? '#CC4C4E' : "#45A081",
                borderWidth: 5,
                lineTension: 0.6
            },
            {
                label: "Line 3",
                data: result.length > 0 && result?.map((item) => lowerLimit),
                fill: false,
                borderColor: "rgba(0, 0, 0, 0)",
                datalabels: {
                    display: false, // Hide data labels for Line 1
                },
            },
            {
                label: "Fill Between Line 1 and Line 3",
                data: result.length > 0 && result?.map((item) => upperLimit),
                fill: "-1",
                borderColor: "rgba(0, 0, 0, 0)", // Set border color to transparent
                backgroundColor: "rgba(144, 238, 144, 0.5)", // Set fill color
                datalabels: {
                    display: false, // Hide data labels for Line 1
                },
            },
        ],
    };
    const fetchData = async () => {
        try {
            const data = await fetch(`http://localhost:4000/hero_graph?patient_id=${patient_id}`);
            const jsonData = await data.json();
            setParameter(jsonData?.parameter)
            if (jsonData?.test_due_date)
                setOrderDueDate(formatDate(jsonData?.test_due_date));
            setReTestLink(jsonData?.retestLink)
            setHasRisk(jsonData?.hasRisk)
            setIsHigh(jsonData?.isHigh)
            setProductLink(jsonData?.product_link)
            setLowerLimit(jsonData?.lowerLimit)
            setUpperLimit(jsonData?.upperLimit)
            setResult(jsonData?.testResults)
            setUnit(jsonData?.unit);
            console.log(jsonData);
        } catch (err) {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchData();
    }, []);
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
                {hasRisk ? <RiskSubHeading hasPastRecord={result?.length > 1} lowerLimit={lowerLimit} higherLimit={upperLimit} increased={change ? change > 0 : false} change={Math.abs(change)} unit={unit} /> : <NonRiskSubHeading parameter={parameter} />}
            </div>
            <Line options={options} data={data} />
            {!!orderDueDate && (
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
                        <a style={{
                            padding: "8px 10px",
                            background: "#10847E",
                            borderRadius: "8px",
                            color: "#fff",
                            borderColor: "transparent"
                        }}
                            href={retestLink}
                            target="_blank" rel="noreferrer"
                        > Retest
                        </a>
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
                        <a style={{
                            padding: "8px 10px",
                            background: "#10847E",
                            borderRadius: "8px",
                            color: "#fff",
                            borderColor: "transparent"
                        }}
                            href={suggestedProductLink}
                            target="_blank" rel="noreferrer"
                        > Browse
                        </a>
                    </div>
                    <Separator />
                </>
            )}
        </div>
    )
};
export default RapidIncrease;

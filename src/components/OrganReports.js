import { useState } from "react";
import DecreaseIcon from "./DecreaseIcon";
import DiabetesSvg from "./DiabetesSvg";
import IncreaseIcon from "./IncreaseIcon";
import VitaminSvg from "./VitaminsSvg";

const icons = {
    "Diabetes": <DiabetesSvg />,
    "Vitamins": <VitaminSvg />
}
const emojis = {
    "happy": (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8.00002" cy="8.00004" r="6.06667" stroke="#62BF9F" stroke-width="1.2" />
            <circle cx="6.33336" cy="6.33337" r="1" fill="#62BF9F" />
            <circle cx="9.66664" cy="6.33337" r="1" fill="#62BF9F" />
            <path d="M10 10C10 10.7364 9.10457 11.3334 8 11.3334C6.89543 11.3334 6 10.7364 6 10" stroke="#62BF9F" stroke-width="1.2" stroke-linecap="round" />
        </svg>
    ),
    "sad": (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7.99967" cy="8.00065" r="6.06667" stroke="#F47779" stroke-width="1.2" />
            <circle cx="6.33301" cy="6.33398" r="1" fill="#F47779" />
            <circle cx="9.66699" cy="6.33398" r="1" fill="#F47779" />
            <path d="M10 11.3333C10 10.597 9.10457 10 8 10C6.89543 10 6 10.597 6 11.3333" stroke="#F47779" stroke-width="1.2" stroke-linecap="round" />
        </svg>
    )
}

const OrganReport = ({ totalParameter, outOfRange, parameterResult, reportName, lastResultDate, secondLastTestResultDate, open }) => {
    const id = `collapse${reportName}`
    return (
        <div style={{background: "#fff", borderRadius: "4px"}}>
            <Header totalParameter={totalParameter} outOfRange={outOfRange} reportName={reportName} open={open} />
            <div style={{ height: "2px", backgroundColor: "#EDF2F9" }}></div>
            <div id={id} class={`collapse ${open && "show"}`}  aria-labelledby="headingOne" data-parent="#accordion">
                <ParameterHeading lastResultDate={lastResultDate} secondLastTestResultDate={secondLastTestResultDate} />
                {parameterResult.map((result) => (
                    <Parameter parameterResult={result} />
                ))}
            </div>
        </div>
    )
}


const Header = ({ totalParameter, outOfRange, reportName, open }) => {
    const happyFlow = outOfRange === 0;
    const id = `collapse${reportName}`;
    const [collapsed, setCollapsed] = useState(open ? false : true);
    return (
        <div
            style={{
                display: "flex",
                padding: "10px",
                position: "relative"
            }}
        >
            <div style={{ marginRight: "8px" }}>
                {icons[reportName]}
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ fontWeight: "600", fontSize: "14px" }}>{reportName} Monitoring</div>
                <div style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "4px", marginTop: "5px", fontWeight: "600", color: "#4F585E" }}>
                    <span
                        style={{
                            color: happyFlow ? "#45A081" : "#CC4C4E"
                        }}
                    > {happyFlow ? totalParameter : outOfRange} </span>
                    {"/"}
                    <span> {totalParameter} </span>
                    <span> {!happyFlow ? " Needs Attention" : " All Looks Good"}</span>
                    {happyFlow ? emojis["happy"] : emojis["sad"]}
                    <div
                        style={{
                            textDecoration: "underline",
                            marginLeft: "auto",
                            cursor: "pointer",
                            color: "var(--Colour-Palette-Neutral-Dark-N400, #6E787E)",
                            fontWeight: "500"
                        }}
                    >
                        View All
                    </div>
                </div>
            </div>
            <div
                style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    transform: `${collapsed ? "rotate(180deg)" : "rotate(0deg)"}`,
                    transition: "transform 0.6s"
                }}
                data-toggle="collapse" data-target={`#${id}`} aria-expanded="true" aria-controls={id}
                onClick={() => setCollapsed(!collapsed)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect width="24" height="24" rx="12" transform="matrix(1 0 0 -1 0 24)" fill="#EDF2F9" />
                    <path d="M17 14.5L12 9.5L7 14.5" stroke="#30363C" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
        </div>
    )
}

const Parameter = ({ parameterResult }) => {
    const { name, increased,
        isGood,
        minLimit,
        maxLimit,
        unit,
        lastResultValue,
        latestResultValue } = parameterResult;
    const color = isGood ? "green" : "red";
    const changedBy = lastResultValue - latestResultValue;
    const graphHeight = 90;

    const calculateHeight = (height) => {
        if (height < minLimit) return 20;
        if (height > maxLimit) return 70;
        if (height === minLimit) return 30;
        if (height === maxLimit) return 60;
        return 50;
    }

    const calculateBackground = (value) => {
        if (value < minLimit || value > maxLimit)
            return "#CC4C4E"
        else
            return "#45A081";
    }

    return (
        <div style={{
            display: "flex",
            padding: "10px 12px"
        }}>
            <div style={{ flex: 1 }}>
                <div
                    style={{
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400
                    }}
                > {name} </div>
                <div style={{
                    color: "var(--Colour-Palette-Neutral-Dark-N800, #30363C)",
                    fontSize: "10px",
                    fontWeight: 400
                }}>
                    {increased ? <IncreaseIcon color={color} /> : <DecreaseIcon color={color} />}
                    <span style={{ marginLeft: "5px" }}>
                        {increased ? "Increased by" : "Decreased by"} {Math.abs(changedBy).toFixed(2)} {unit}
                    </span>
                </div>
                <div style={{
                    fontSize: "10px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    color: "#6E787E"
                }}>
                    Range {minLimit} - {maxLimit} {unit}
                </div>
            </div>
            <div style={{
                width: "35%",
                display: "flex",
                flexDirection: "column",
                height: graphHeight,
                background: "#F9FCFF",
                boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.12) inset",
                position: "relative"
            }}
            >
                <div style={{ flex: 1 }}> </div>
                <div style={{ flex: 1, background: "#E7FFF2" }}> </div>
                <div style={{ flex: 1 }}> </div>
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "space-around"
                    }}
                >
                    <div style={{ width: "20px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                        <div style={{
                            fontSize: "10px",
                            fontWeight: 500
                        }}> {lastResultValue}</div>
                        <div style={{ height: calculateHeight(lastResultValue), background: calculateBackground(lastResultValue) }}> </div>
                    </div>
                    <div style={{ width: "20px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                        <div style={{
                            fontSize: "10px",
                            fontWeight: 500
                        }}> {latestResultValue}</div>
                        <div style={{ height: calculateHeight(latestResultValue), background: calculateBackground(latestResultValue) }}> </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const ParameterHeading = ({ lastResultDate, secondLastTestResultDate }) => {
    return (
        <div style={{
            fontWeight: "700",
            fontSize: "8px",
            textTransform: "uppercase",
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 12px"
        }}>
            <div>
                Parameters
            </div>
            <div style={{
                width: "35%",
                display: "flex",
                justifyContent: "space-around"
            }}>
                <span> {secondLastTestResultDate.split(",")[0]} </span>
                <span> {lastResultDate.split(",")[0]} </span>
            </div>
        </div>
    )
}


const parameterResult = [{
    name: "Fasting Blood Sugar(Glucose)",
    increased: true,
    isGood: false,
    minLimit: 70,
    maxLimit: 100,
    unit: "mg/dl",
    lastResultValue: 94,
    latestResultValue: 102.6
}, {
    name: "Avg Blood Glucose(ABG)",
    increased: true,
    isGood: false,
    minLimit: 90,
    maxLimit: 120,
    unit: "mg/dl",
    lastResultValue: 120,
    latestResultValue: 150
}, {
    name: "HbA 1C",
    increased: false,
    isGood: true,
    minLimit: 0,
    maxLimit: 5.7,
    unit: "%",
    lastResultValue: 6.1,
    latestResultValue: 5.3
}]
const lastResultDate = "16 March, 2023", secondLastTestResultDate = "12 Jan, 2023";
const OrganReports = () => (
    <div style={{ padding: "10px 20px", background: "var(--Colour-Palette-Neutral-Light-N10, #F5F8FC)"}}>
        <OrganReport totalParameter={32} outOfRange={2} parameterResult={parameterResult} reportName="Diabetes" lastResultDate={lastResultDate} secondLastTestResultDate={secondLastTestResultDate} open={true} />
        <OrganReport totalParameter={10} outOfRange={0} parameterResult={parameterResult} reportName="Vitamins" lastResultDate={lastResultDate} secondLastTestResultDate={secondLastTestResultDate} />
    </div>
)
export default OrganReports;

import { Serie, ResponsiveLine } from "@nivo/line";

const DATE_FORMAT = "%Y-%m-%d";
const YEAR_FORMAT = "%Y";


export default function LineChart({ data }: { data: Serie[] }) {
  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 50, right: 110, bottom: 50, left: 80 }}
      xScale={{
        format: DATE_FORMAT,
        precision: "day",
        type: "time",
        useUTC: false
      }}
      xFormat={`time:${DATE_FORMAT}`}
      yScale={{
        type: "linear",
        min: 0,
        max: 8000000,
        stacked: false,
        reverse: false,
      }}
    
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickValues: "every year",
        format: YEAR_FORMAT,
      }}
      axisLeft={{
        legend: "Address Count",
        legendOffset: -70,
        legendPosition: "middle",
      }}
      curve="monotoneX"
      enableGridX={false}
      enableGridY={true}
      colors={(serie) => serie.color}
      enablePoints={false}
      legends={[
        {
          anchor: "top",
          direction: "row",
          justify: false,
          translateX: 0,
          translateY: -40,
          itemsSpacing: 10,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
        },
      ]}
      tooltip={(props) => (
        <div className="bg-gray-200 p-2 text-sm shadow rounded">
          <div>{props.point.serieId}</div>
          <div>{props.point.data.xFormatted}</div>
          <div>Addresses: {props.point.data.yFormatted}</div>
        </div>
      )}
      enablePointLabel={true}
      useMesh={true}
    />
  );
}

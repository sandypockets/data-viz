const svg = d3.select("svg")

svg
  .attr("width", 800)
  .attr("height", data.length * 150)


const colorScale = d3.scaleLinear()
  .domain([-15, -9, -7, 0, 5, 10, 15, 20, 25, 29, 30, 32, 36])
  .range([
    "#184e77", // -15
    "#1e6091", // -9
    "#166386", // -7
    "#1a759f", // 0
    "#168aad", // 5
    "#34a0a4", // 10
    "#52b69a", // 15
    "#76c893", // 20
    "#99d98c", // 25
    "#a4e896", // 29
    "#b5e48c", // 30
    "#d9ed92", // 32
    "#eaffa9", // 36
  ])

const boxScale = d3.scaleLinear()
  .domain([-20, 45])
  .range([150, 0])

const unitScale = d3.scaleLinear()
  .domain([0, 100])
  .rangeRound([32, 212])

const lineGenerator = d3.line()
  .x((d, i) => { return 225 + 50 * i })
  .y((d, i) => { return boxScale(d) })

const dataPoints = svg
  .selectAll("g.data-point")
  .data(data)
  .enter()
  .append("g")
  .attr("class", "data-point")
  .attr("transform", (d, i) => { return `translate (0, ${i * 150})` })


dataPoints
  .append("text")
  .attr("x", 175)
  .attr("y", 70)
  .attr("class", "city")
  .text((d, i) => { return data[i].city })

dataPoints
  .append("text")
  .attr("x", 175)
  .attr("y", 100)
  .attr("class", "country")
  .text((d, i) => { return data[i].country })


const months = dataPoints
  .append("g")
  .attr("class", "months")
  .attr("transform", "translate(200, 0)")

const monthGroups = months
  .selectAll("g.month")
  .data((d, i) => { return data[i].months })
  .enter()
  .append("g")
  .attr("class", "month")
  .attr("transform", (d, i) => { return `translate(${i * 50}, 0)` })


monthGroups
  .append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", 50)
  .attr("height", 150)
  .style("fill", (d, i) => { return colorScale(d) })

monthGroups
  .append("circle")
  .attr("cx", 25)
  .attr("cy", (d, i) => { return boxScale(d) })
  .attr("r", 15)

const temperatures = monthGroups
  .append("text")
  .attr("class", "temp")
  .attr("x", 25)
  .attr("y", (d, i) => { return boxScale(d) + 2 })
  .text((d, i) => { return d })
  .style("fill", (d, i) => { return colorScale(d) })

dataPoints
  .append("path")
  .datum((d, i) => { return d.months })
  .attr("d", (d, i) => { return lineGenerator(d) })


const selectTag = document.querySelector("select")
selectTag.addEventListener("input", function() {
  if (this.value === 'C') {
    temperatures.text((d, i) => { return d })
  } else {
    temperatures.text((d, i) => { return unitScale(d) })
  }
})
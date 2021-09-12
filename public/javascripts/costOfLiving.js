const svg = d3.select("svg")

svg
  .attr("width", 960)
  .attr("height", 720)

const axisXGroup = svg
  .append("g")
  .attr("class", "x-axis")
  .attr("transform", "translate(0, 620)")

const axisYGroup = svg
  .append("g")
  .attr("class", "y-axis")
  .attr("transform", "translate(100, 0)")

const axisXText = svg
  .append("text")
  .attr("class", "x-axis")
  .attr("transform", "translate(460, 670)")
  .text("x axis")

const axisYText = svg
  .append("text")
  .attr("class", "y-axis")
  .attr("transform", "translate(50, 330), rotate(-90)")
  .text("y axis")

const placeCities = function() {

  let inputX = document.querySelector("select[name=valueX]")
  let inputY = document.querySelector("select[name=valueY]")

  let valueX = inputX.value
  let valueY = inputY.value

  let textX = inputX.options[inputX.selectedIndex].innerHTML
  let textY = inputX.options[inputY.selectedIndex].innerHTML

  axisXText.text(textX)
  axisYText.text(textY)

  let maxValueX = d3.max(data, (d, i) => { return d[valueX] })
  let maxValueY = d3.max(data, (d, i) => { return d[valueY] })
  let maxValueR = d3.max(data, (d, i) => { return d.population })

  const scaleX = d3.scaleLinear()
    .domain([0, maxValueX])
    .range([100, 860])

  const scaleY = d3.scaleLinear()
    .domain([0, maxValueY])
    .range([620, 100])

  const scaleR = d3.scaleSqrt()
    .domain([0, maxValueR])
    .range([0, 30])

  const axisX = d3.axisBottom(scaleX)
    .tickSizeInner(-520)
    .tickSizeOuter(0)
    .tickPadding(10)
    .ticks(10, "$,f")

  const axisY = d3.axisLeft(scaleY)
    .tickSizeInner(-760)
    .tickSizeOuter(0)
    .tickPadding(10)

  axisXGroup.call(axisX)
  axisYGroup.call(axisY)

  const cities = svg
    .selectAll("g.city")
    .data(data, (d, i) => { return d.city })
    .enter()
    .append("g")
    .attr("class", "city")
    .attr("transform", (d, i) => {
      const x = scaleX(d[valueX])
      const y = scaleY(d[valueY])
      return `translate(${x}, ${y})`
    })

  cities
    .append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 0)
    .transition()
    .attr("r", (d, i) => { return scaleR(d.population) })

  cities
    .append("rect")
    .attr("x", -60)
    .attr("y", (d, i) => { return -1 * scaleR(d.population) - 35 })
    .attr("width", 120)
    .attr("height", 30)

  cities
    .append("text")
    .attr("x", 0)
    .attr("y", (d, i) => { return -1 * scaleR(d.population) - 15 })
    .text((d, i) => { return d.city })

  svg
    .selectAll("g.city")
    .transition()
    .duration(500)
    .attr("transform", (d, i) => {
      const x = scaleX(d[valueX])
      const y = scaleY(d[valueY])
      return `translate(${x}, ${y})`
    })

  svg
    .selectAll("g.city")
    .on("mouseover", function() {
      d3.select(this).raise()
    })
}

// Run on load
placeCities()

const selectTags = document.querySelectorAll("select")

selectTags.forEach((tag) => {
  tag.addEventListener("change", function() {
    placeCities()
  })
})
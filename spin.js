var padding = { top: 20, right: 40, bottom: 0, left: 0 },
  w = 500 - padding.left - padding.right,
  h = 500 - padding.top - padding.bottom,
  r = Math.min(w, h) / 2,
  rotation = 0,
  oldrotation = 0,
  picked = 100000,
  oldpick = [],
  color = [
    "#007EC3",
    "#502C7E",//purple
    "#B81E78",//pink
    "#33B071",//green
    "#007EC3",
    "#502C7E",//purple
    "#C2CCD2",//grey
    "#007EC3",
    "#33B071",//green
    "#C2CCD2",//grey
    "#502C7E",//purple
    "#B81E78",
    "#C2CCD2",//grey
  ];

var data = [
  {
    label: "",
    value: 1,
    question: "Circular economy as the business model",
  },
  { label: "", value: 2, question: "Green, lean supply chains" },
  {
    label: "",
    value: 3,
    question: "Low-impact manufacturing",
  },
  {
    label: "",
    value: 4,
    question: "Right materials and design processes",
  },
  {
    label: "",
    value: 5,
    question: "Utility-efficient buildings",
  },
  {
    label: "",
    value: 6,
    question: "Circular economy as the business model",
  },
  { label: "", value: 7, question: "Green, lean  supply chains" },
  {
    label: "",
    value: 8,
    question: "Low-impact manufacturing",
  },
  {
    label: "",
    value: 9,
    question: "Right materials and design processes",
  },
  {
    label: "",
    value: 10,
    question: "Utility-efficient buildings",
  },
  {
    label: "",
    value: 11,
    question: "Circular economy as the business model",
  },
  { label: "", value: 11, question: "Green, lean  supply chains" },
  {
    label: "",
    value: 12,
    question: "Low-impact manufacturing",
  },
];

var newRadius = 300;
var svgWidth = newRadius * 2 + padding.left + padding.right;
var svgHeight = newRadius * 2 + padding.top + padding.bottom;
var svg = d3
  .select("#chart")
  .append("svg")
  .data([data])
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var container = svg
  .append("g")
  .attr("class", "chartholder")
  .attr(
    "transform",
    "translate(" + (newRadius + padding.left) + "," + (newRadius + padding.top) + ")"
  );

var vis = container.append("g");

var pie = d3.layout
  .pie()
  .sort(null)
  .value(function (d) {
    return 1;
  });
// declare an arc generator function
var arc = d3.svg.arc().outerRadius(newRadius);

// select paths, use arc generator to draw
///////////////////////////////////////// Append filter for slight shadow effect/////////////////////////////////////////
var defs = svg.append("defs");
var filter = defs
  .append("filter")
  .attr("id", "drop-shadow")
  .attr("x", "-50%") // Ensure the filter covers the entire SVG canvas
  .attr("y", "-50%")
  .attr("width", "200%") // Ensure the filter covers the entire SVG canvas
  .attr("height", "200%");

filter
  .append("feGaussianBlur")
  .attr("in", "SourceAlpha")
  .attr("stdDeviation", 2); // Adjust the standard deviation to control the blur intensity

filter
  .append("feOffset")
  .attr("dx", 1)
  .attr("dy", 1)
  .attr("result", "offsetBlur");

var feMerge = filter.append("feMerge");

feMerge.append("feMergeNode");
feMerge.append("feMergeNode").attr("in", "SourceGraphic");

var arcs = vis
  .selectAll("g.slice")
  .data(pie)
  .enter()
  .append("g")
  .attr("class", "slice")
  .style("filter", "url(#drop-shadow)")// Apply slight shadow effect
  .attr("r", newRadius)

// //////////////////////////////////end//////////////////////////////////////////////////////

// ////////////////////////////////bgcolor/////////////////////////////////////////////////

arcs
  .append("path")
  .attr("fill", function (d, i) {
    return color[i];
  })
  .attr("d", function (d) {
    return arc(d);
  });

// ///////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////// add the inner text////////////////////////////////////////
// arcs.append("text").attr("transform", function (d) {
//   d.innerRadius = 0;
//   d.outerRadius = r;
//   d.angle = (d.startAngle + d.endAngle) / 2;
//   return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")translate(" + (d.outerRadius - 10) + ")";
// })
//   .attr("text-anchor", "end")
//   .text(function (d, i) {
//     return data[i].label;
//   });

// //////////////////////////////////////////////////////////////////////////////////

container.on("click", spin);

function spin(d) {
  container.on("click", null);
  //all slices have been seen, all done
  console.log("OldPick: " + oldpick.length, "Data length: " + data.length);
  if (oldpick.length == data.length) {
    console.log("done");
    container.on("click", null);
    return;
  }
  var ps = 360 / data.length,
    pieslice = Math.round(1440 / data.length),
    rng = Math.floor(Math.random() * 1440 + 360);

  rotation = Math.round(rng / ps) * ps;

  picked = Math.round(data.length - (rotation % 360) / ps);
  picked = picked >= data.length ? picked % data.length : picked;
  if (oldpick.indexOf(picked) !== -1) {
    d3.select(this).call(spin);
    return;
  } else {
    oldpick.push(picked);
  }
  rotation += 90 - Math.round(ps / 2);
  vis
    .transition()
    .duration(3000)
    .attrTween("transform", rotTween)
    .each("end", function () {
      //mark question as seen
      //   d3.select(".slice:nth-child(" + (picked + 1) + ") path").attr(
      //     "fill",
      //     "#111"
      //   );
      //populate question
      var questionColors = [
        "#502C7E", // Color for value 1
        "#33B071", // Color for value 2
        "#B81E78", // Color for value 3
        "#005593",
        "#C2CCD2",
        "#502C7E", // Color for value 6
        "#33B071", // Color for value 7
        "#B81E78", // Color for value 8
        "#005593",
        "#C2CCD2",
      ];

      // Function to get the color based on the value
      function getQuestionColor(value) {
        return questionColors[value - 1] || "black"; // Default to black if value is out of range
      }

      function insertLineBreaks(text, maxLength) {
        var words = text.split(" ");
        var lines = [];
        var line = "";

        words.forEach(function (word) {
          if (line.length + word.length <= maxLength) {
            line += word + " ";
          } else {
            lines.push(line.trim());
            line = word + " ";
          }
        });

        if (line.length > 0) {
          lines.push(line.trim());
        }

        return lines.join("<br>");
      }
      var questionText = data[picked].question;
      // Add line breaks where needed (for example, after certain words)
      var maxLength = 20;
      d3.select("#question h1").html(insertLineBreaks(questionText, maxLength))
        .style("color", getQuestionColor(data[picked].value))
        .style("font-weight", 800)
        .style("text-shadow", function () {
          if (data[picked].value === 5 || data[picked].value === 10) {
            return "2px 2px ##C2CCD2";
          } else {
            return "none";
          }
        });;
      oldrotation = rotation;

      /* Get the result value from object "data" */
      console.log(data[picked].value);

      /* Comment the below line for restrict spin to sngle time */
      container.on("click", spin);
    });
}

//////////////////////////////////////////////make arrow//////////////////////////////////////////////////////
// svg
//   .append("g")
//   .attr(
//     "transform",
//     "translate(" +
//       (w + padding.left + padding.right) +
//       "," +
//       (h / 2 + padding.top) +
//       ")"
//   )
//   .append("image")
//   .attr("xlink:href", "./assets/images/Spin-wheel-pointer.svg") 
//     .attr("x", -(r * 0.15)) // Set the x position of the image
//     .attr("y", -(r * 0, 40)) // Set the y position of the image
//   .attr("width", 90) // Set the width of the image
//   .attr("height", 60) // Set the height of the image
//   .style("max-width", "100%") // Ensure the image fits within the circle radius
//   .style("max-height", "100%");

/////////////////////////////////////////////////end//////////////////////////////////////////

/////////////////////////////////////////////draw spin circle/////////////////////////////
container
  .append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 15)
  .style({ fill: "white", cursor: "pointer" })
  .style("filter", "url(#drop-shadow)");
///////////////////////////////////////////////end////////////////////////////////////////////

//////////////////////////////////////////spin text//////////////////////////////////////////////
// container
//   .append("text")
//   .attr("x", 0)
//   .attr("y", 15)
//   .attr("text-anchor", "middle")
//   .text("SPIN")
//   .style({ "font-weight": "bold", "font-size": "30px" });

// /////////////////////////////////////////end/////////////////////////////////////////////////////////////////

// -------------------------------------- for circle-------------------------------------------
// Append circle for border
// Append filter for inner shadow
var defs = svg.append("defs");
var filter = defs
  .append("filter")
  .attr("id", "inner-shadow")
  .attr("x", "-50%") // Ensure the filter covers the entire SVG canvas
  .attr("y", "-50%")
  .attr("width", "200%") // Ensure the filter covers the entire SVG canvas
  .attr("height", "200%");

filter
  .append("feOffset")
  .attr("result", "offOut")
  .attr("in", "SourceAlpha")
  .attr("dx", 0)
  .attr("dy", 0);

filter
  .append("feGaussianBlur")
  .attr("result", "blurOut")
  .attr("in", "offOut")
  .attr("stdDeviation", 5); // Adjust the standard deviation to control the blur intensity

filter
  .append("feBlend")
  .attr("in", "SourceGraphic")
  .attr("in2", "blurOut")
  .attr("mode", "normal");
container
  .append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", newRadius) // Set radius to match pie chart radius
  .style("fill", "none")
  .style("stroke", "#032741") // Border color
  .style("stroke-width", 18) // Border width
  .style("filter", "url(#inner-shadow)"); // Apply inner shadow effect

// -----------------------------------------------------------------------------------------------

function rotTween(to) {
  var i = d3.interpolate(oldrotation % 360, rotation);
  return function (t) {
    return "rotate(" + i(t) + ")";
  };
}

function getRandomNumbers() {
  var array = new Uint16Array(1000);
  var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
  if (
    window.hasOwnProperty("crypto") &&
    typeof window.crypto.getRandomValues === "function"
  ) {
    window.crypto.getRandomValues(array);
    console.log("works");
  } else {
    //no support for crypto, get crappy random numbers
    for (var i = 0; i < 1000; i++) {
      array[i] = Math.floor(Math.random() * 100000) + 1;
    }
  }
  return array;
}

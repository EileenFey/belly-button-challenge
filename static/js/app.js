function buildMetadata(sample) {
  d3.json(
    "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
  ).then((data) => {
    let metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    let resultArray = metadata.filter((metaObj) => metaObj.id == sample);
    let result0 = resultArray[0];
    // YOUR CODE HERE
    console.log(metadata);

    // Use d3 to select the panel with id of `#sample-metadata`
    let PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Loop through each key-value pair in the metadata and append them to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    for (key in result0) {
      // YOUR CODE HERE
      PANEL.append("div").text(`${key}: ${result0[key]}`);
    }
  });
}

function buildCharts(sample) {
  d3.json(
    "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
  ).then((data) => {
    let samples = data.samples;
    console.log(samples);
    let resultArray = samples.filter((sampleObj) => sampleObj.id == sample);
    let result = resultArray[0];

    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    // Build a Bubble Chart
    let bubbleLayout = {
      title: "Marker Size",
      showlegend: false,
      height: 600,
      width: 1200,
    };
    let stuff = {
      x: otu_ids,
      y: sample_values,
      mode: "markers",
      text: otu_labels,
      marker: {
        color: otu_ids,
        size: sample_values,
      },
    };

    let bubbleData = [stuff];

    Plotly.newPlot("bubble", bubbleData, bubbleLayout);

    let yticks = otu_ids
      .slice(0, 10)
      .map((otuID) => `OTU ${otuID}`)
      .reverse();
    let barData = [
      {
        type: "bar",
        x: sample_values,
        y: yticks,
        orientation: "h",
        text: otu_labels,
      },
    ];
    console.log(yticks);
    let barLayout = {};

    Plotly.newPlot("bar", barData, barLayout);
  });
}

function init() {
  // Grab a reference to the dropdown select element
  let selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json(
    "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
  ).then((data) => {
    let sampleNames = data.names;
    console.log(sampleNames);

    for (let i = 0; i < sampleNames.length; i++) {
      samName = sampleNames[i];
      selector.append("option").attr("value", samName).text(samName);
    }

    // Use the first sample from the list to build the initial plots
    let firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();

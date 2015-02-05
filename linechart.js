/**
 * Created by plee on 2/3/15.
 */
$(document).on('ready', function(){

    var data = [
        {x: 30, y: 10},
        {x: 50, y: 45},
        {x: 80, y: 27},
        {x: 100, y: 96},
    ];

    var margin = {
        top: 20,
        right: 20,
        bottom: 40,
        left: 40
    };
    var width = 600 - margin.left - margin.right;
    var height = 500 - margin.top - margin.bottom;
    var barwidth = 20;

    var y = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.y; })])
        .range([height, 0]);

    var x = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.x; })])
        .range([0,width]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom')
        .ticks(5);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left')
        .ticks(5);


    var lines = d3.select('.lines')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');



    var line = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); })
        .interpolate('linear');

    var cardinal = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); })
        .interpolate('cardinal');

    var basis = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); })
        .interpolate('basis');

    lines.append('path')
        .attr('class', 'line')
        .attr('d', line(data))
        .attr('stroke', 'blue');
    lines.append('path')
        .attr('class', 'line')
        .attr('d', cardinal(data))
        .attr('stroke', 'red');
    lines.append('path')
        .attr('class', 'line')
        .attr('d', basis(data))
        .attr('stroke', 'green');
    lines.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    lines.append('g')
        .attr('class', 'y axis')
        .call(yAxis);

})

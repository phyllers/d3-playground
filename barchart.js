/**
 * Created by plee on 2/3/15.
 */
$(document).on('ready', function(){

    var data = [
        {name: 'Sleepy',    value: 4},
        {name: 'Sneezy',    value: 8},
        {name: 'Happy',     value: 14},
        {name: 'Bashful',   value: 17},
        {name: 'Grumpy',    value: 23},
        {name: 'Doc',       value: 34},
        {name: 'Dopey',     value: 43}
    ];

    var exit_data = [
        {name: 'Sleepy',    value: 3},
        {name: 'Sneezy',    value: 54},
        {name: 'Happy',     value: 23},
        {name: 'Bashful',   value: 7},
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
        .domain([0, d3.max(data, function(d) { return d.value; })])
        .range([height, 0]);

    var x = d3.scale.ordinal()
        .domain(data.map(function(d) { return d.name; }))
        .rangeRoundBands([0,width],.1);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient('left');

    var barchart1 = d3.select('.barchart1')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    barchart1.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis);

    barchart1.append('g')
        .attr('class', 'y axis')
        .call(yAxis);

    barchart1.selectAll('.bar')
            .data(data)
        .enter().append('rect')
            .attr('class', 'bar')
        .attr('x', function(d) { return x(d.name); })
        .attr('y', function(d) { return y(d.value); })
        .attr('height', function(d) { return height - y(d.value); })
        .attr('width', x.rangeBand());

    barchart1.selectAll('rect')
        .on('mouseenter', function() {
            console.log('over');
            d3.select(this).style('fill', 'orange');
        })
        .on('mouseleave', function() {
            console.log('out');
            d3.select(this).style('fill', 'steelblue');
        });

//    d3.select('.barchart1')
//        .style('background-color', 'white')
//        .transition()
//        .style('background-color', 'silver');

    var circles = d3.select('.circles')
        .attr('width', width)
        .attr('height', height);

    circles.selectAll('.point')
        .data(data)
        .enter().append('circle')
        .attr('class', 'point')
        .attr('cx', function(d) { return d.value * 10; })
        .attr('cy', '100')
        .attr('r', function(d) { return d.value; })
//        .attr('pointer-events', 'all')
        .on('mouseover', fade(0.1))
        .on('mouseout', fade(1));


//    circles.selectAll('.point')
//        .data(exit_data)
//        .exit().transition()
//        .duration(500)
//        .ease('linear')
//        .each(function(d) {
//            d3.select(this).transition().style('opacity', 0).remove();
//        });

    function fade(opacity) {
        return function(g) {
            circles.selectAll('.circles .point')
                .filter(function(d) { return d.name != g.name; })
                .transition()
                .style('opacity', opacity);
        }
    }

    function type(d) {
        d.value = +d.value;
        return d;
    }
})

var Start = [0, 365];
var values = [];
var k = 0;
var tapSlider = document.getElementById('tbSlider');
var option = {
    start: Start,
    behaviour: 'unconstrained-hover',
    tooltips: true,
    connect: true,
    step: 1,
    format: wNumb({
        decimals: 0,
    }),
    range: {
        'min': 0,
        '25%': 90,
        '50%': 180,
        '75%': 270,
        'max': 365
    }, pips: {
        mode: 'range',
        density: 3
    }
}
var disableAdd = false;

$(document).ready(function () {

    loadData();
    $(tapSlider).on('click', function (value) {
        CreateHandle();
    });
    $('#tblTbody').on('click', '.btnRemove', function () {
        if ($('tr', '#tblTbody').length == 2) {
            MessageModal("Atleast 2 rates should be there")
            return;
        }
        values = [];
        $('input', '#tblTbody').each(function (index, val) {
            values.push($(val).val());
        })
        var tr = $(this).parent().parent();
        var max = $('td', tr).eq(1).text()
        for (var i = 0; i < Start.length; i++) {
            if (parseFloat(Start[i]).toFixed(0) == max) {
                Start.splice(i, 1)
                values.splice(i - 1, 1)
                break;
            }
        }
        tapSlider.noUiSlider.destroy();
        Start.sort(function (a, b) { return parseFloat(a) - parseFloat(b) })
        option.start = Start
        noUiSlider.create(tapSlider, option);
        if (!Array.isArray(tapSlider.noUiSlider.get()))
            Start = [tapSlider.noUiSlider.get()]
        else
            Start = tapSlider.noUiSlider.get();

        Start.sort(function (a, b) { return parseFloat(a) - parseFloat(b) })

        $('#tblTbody').empty();
        tboxValue = "";
        for (var i = 0; i < Start.length - 1; i++) {
            var tboxValue = "";
            if (values[i] != undefined) {
                tboxValue = values[i]
            }
            $('#tblTbody').append("<tr><td>" + parseFloat(Start[i]).toFixed(0) + "</td><td>" + parseFloat(Start[i + 1]).toFixed(0) + '</td><td><input class="form-control" type="text" value="' + tboxValue + '"></td><td><a class="btn btn-danger btnRemove">X</a></td></tr>')

        }
        if (values[Start.length - 1] != undefined) {
            tboxValue = values[i]
        } else {
            tboxValue = "";
        }
        $('#tblTbody').append("<tr><td>" + parseFloat(Start[Start.length - 1]).toFixed(0) + "</td><td>" + "&#8734;" + '</td><td><input class="form-control" type="text" value="' + tboxValue + '"></td><td></td></tr>')
        ReassignEvents();
    });

});

function CreateHandle() {
    console.debug('click')
    if (!disableAdd) {
        tapSlider.noUiSlider.destroy();
        Start.push(k);
        Start.sort(function (a, b) { return parseFloat(a) - parseFloat(b) })
        option.start = Start
        noUiSlider.create(tapSlider, option);
        ReassignEvents()
        values = [];
        $('input', '#tblTbody').each(function (index, val) {
            values.push($(val).val());
        })
        $('#tblTbody').empty();
        tboxValue = "";
        for (var i = 0; i < Start.length - 1; i++) {
            var tboxValue = "";
            if (values[i] != undefined) {
                tboxValue = values[i]
            }
            $('#tblTbody').append("<tr><td>" + parseFloat(Start[i]).toFixed(0) + "</td><td>" + parseFloat(Start[i + 1]).toFixed(0) + '</td><td><input class="form-control" type="text" value="' + tboxValue + '"></td><td><a class="btn btn-danger btnRemove">X</a></td></tr>')

        }
        if (values[Start.length - 1] != undefined) {
            tboxValue = values[i]
        } else {
            tboxValue = "";
        }
        $('#tblTbody').append("<tr><td>" + parseFloat(Start[Start.length - 1]).toFixed(0) + "</td><td>" + "&#8734;" + '</td><td><input class="form-control" type="text" value="' + tboxValue + '"></td><td></td></tr>')

    }
};


function ReassignEvents() {
    tapSlider.noUiSlider.on('set', function () {
        if (!Array.isArray(tapSlider.noUiSlider.get()))
            Start = [tapSlider.noUiSlider.get()]
        else
            Start = tapSlider.noUiSlider.get();

        Start.sort(function (a, b) { return parseFloat(a) - parseFloat(b) })
        values = [];
        $('input', '#tblTbody').each(function (index, val) {
            values.push($(val).val());
        })
        $('#tblTbody').empty();
        tboxValue = "";
        for (var i = 0; i < Start.length - 1; i++) {
            var tboxValue = "";
            if (values[i] != undefined) {
                tboxValue = values[i]
            }
            $('#tblTbody').append("<tr><td>" + parseFloat(Start[i]).toFixed(0) + "</td><td>" + parseFloat(Start[i + 1]).toFixed(0) + '</td><td><input class="form-control" type="text" value="' + tboxValue + '"></td><td><a class="btn btn-danger btnRemove">X</a></td></tr>')

        }
        if (values[Start.length - 1] != undefined) {
            tboxValue = values[i]
        } else {
            tboxValue = "";
        }
        $('#tblTbody').append("<tr><td>" + parseFloat(Start[Start.length - 1]).toFixed(0) + "</td><td>" + "-" + '</td><td><input class="form-control" type="text" value="' + tboxValue + '"></td><td></td></tr>')

    });
    tapSlider.noUiSlider.on('start', function () {
        disableAdd = true
        console.debug('start');
    })
    tapSlider.noUiSlider.on('hover', function (value) {
        k = value;
        console.debug('hover')
    });
    tapSlider.noUiSlider.on('end', function () {
        console.debug('end');
        setTimeout(function (e) { disableAdd = false }, 1)
    })

    

}

function loadData() {

    Start = [0, 365];
    values = [];

    option.start = Start;
    noUiSlider.create(tapSlider, option);
    ReassignEvents();

    $('#tblTbody').empty();
    tboxValue = "";
    for (var i = 0; i < Start.length - 1; i++) {
        var tboxValue = "";
        if (values[i] != undefined) {
            tboxValue = values[i]
        }
        $('#tblTbody').append("<tr><td>" + parseFloat(Start[i]).toFixed(0) + "</td><td>" + parseFloat(Start[i + 1]).toFixed(0) + '</td><td><input class="form-control" type="text" value="' + tboxValue + '"></td><td><a class="btn btn-danger btnRemove">X</a></td></tr>')

    }
    if (values[Start.length - 1] != undefined) {
        tboxValue = values[i]
    } else {
        tboxValue = "";
    }
    $('#tblTbody').append("<tr><td>" + parseFloat(Start[Start.length - 1]).toFixed(0) + "</td><td>" + "&#8734;" + '</td><td><input class="form-control" type="text" value="' + tboxValue + '"></td><td></td></tr>')



}


function MessageModal(str) {
    document.getElementById("confirmessage").innerHTML = str;
    $('#MessageStr').modal('show')
    return false;
}

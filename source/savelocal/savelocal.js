var tagGbnList = [
    {"id": "10", "val": "연구주제"},
    {"id": "20", "val": "연구방법"},
    {"id": "30", "val": "연구결과"}
];

var tagList = [
    [{"id": "11", "val": "문제정의"}, {"id": "12", "val": "가설설정"}],
    [{"id": "21", "val": "대상데이터"}, {"id": "22", "val": "데이터처리"}, {"id": "23", "val": "제안방법"}, {
        "id": "24",
        "val": "이론/모형"
    }],
    [{"id": "31", "val": "성능/효과"}, {"id": "32", "val": "후속연구"}]
];



for (var i = 0; i < 3; i++) {
    var sel = $("#detail_search_gbn").find("select").eq(i);
    for (var j = 0; j < tagGbnList.length; j++) {
        if (j == (i - 1))
            sel.append("<option value='" + tagGbnList[j].id + "' selected='selected'>" + tagGbnList[j].val + "</option>");
        else
            sel.append("<option value='" + tagGbnList[j].id + "'>" + tagGbnList[j].val + "</option>");
    }

    if (i != 0) {
        setOptions(i, i);
    }
}

$('.sel_tag_gbn1').change(function () {
    changeTagGbn(this);
});

$.ajax({
    url: "/aiq/mlsh3/selectSubjectList.do",
    type: 'post',
    dataType: 'json',
    success: function (data) {
        for (var i = 0; i < data.length; i++) {
            var docCount = numberWithCommas(data[i].docCount);
            var html = '<span class="col_p_50"><label class="ml10 mr10"><input type="checkbox" onClick="clickDdsVal()" name="conddc" class="searchDdsVal" value="' + data[i].name + '">' + data[i].label + '(' + docCount + ')</label></span>';
            $("#div_detail_dds_list").append(html);
        }
    }
});

$("#modal").detach().appendTo("body");

//saving local

const formId = "aiqMlshDetail"
const url = '/aiq/mlsh3/selectAIQMlshList.do'

const detailFormIdentifier = ` `;

let form = document.getElementById(formId);

let detailFormElements = form.elements;

const populateForm = () => {
    if (localStorage.key(detailFormIdentifier)) {
        const savedData = JSON.parse(localStorage.getItem(detailFormIdentifier));
        for (const element of detailFormElements) {
            if (element.id in savedData) {
                element.value = savedData[element.id];
            }
        }

    }

};


populateForm()


function submit_id_executute() {
    const formId = "aiqMlshDetail"
    const url = '/aiq/mlsh3/selectAIQMlshList.do'

    const detailFormIdentifier = ` `;
    console.log(detailFormIdentifier)
    let form = document.getElementById(formId);


    let detailFormElements = form.elements;

    const getFormData = () => {
        // let dataArray={};
        let count = 0;
        let data = {[detailFormIdentifier]: {}};
        let dataArray = {[detailFormIdentifier]: {}};
        let checkTY=0
        for (const element of detailFormElements) {
            if (element.name.length > 0) {
                data[detailFormIdentifier][element.id] = element.value;

                if(checkTY%4===0){
                    count+=1
                }
                if(element.name!=='searchType'){
                checkTY+=1}
                console.log(element.id+""+element.name + "|||" + element.value);

            }
        }

        console.log(data)
        console.log(count)
        console.log(dataArray)
        console.log(":::::::::::::::::::::::::::::::::::::::::::")
        return data;
    };

    let data = getFormData();

    localStorage.setItem(detailFormIdentifier, JSON.stringify(data[detailFormIdentifier]));


    console.log(":::::::::::::::::::::::::::;")
    // document.onload=populateForm();
    console.log(":::::::::::::::::::::::::::;")


}

function clickDdsVal() {
    var hasChecked = false;
    var ddsVals = $(".searchDdsVal");

    for (var i = 0; i < ddsVals.length; i++) {
        if ($(ddsVals[i]).is(":checked")) {
            hasChecked = true;
            break;
        }
    }
    if (hasChecked) $(".searchDdsAll").prop("checked", false);
}

function clickDdsAll() {
    if ($(".searchDdsAll").is(":checked")) {
        var ddsVals = $(".searchDdsVal");

        for (var i = 0; i < ddsVals.length; i++) {
            if ($(ddsVals[i]).is(":checked")) {
                $(ddsVals[i]).prop("checked", false);
            }
        }
    }
}

function changeTagGbn(obj) {
    var id = $(obj).parent().attr('id');
    var idx = parseInt(id.substring(id.lastIndexOf("_") + 1));

    var gbnIdx = obj.selectedIndex;
    if (gbnIdx == 0) return;

    gbnIdx = gbnIdx - 1;

    setOptions(gbnIdx, idx);
}

function setOptions(gbnIdx, idx) {
    var sel = $("#sel_tag_gbn2_" + idx).find("select");

    $("#sel_tag_gbn2_" + idx).find("select").find("option").slice(1).remove();

    var tags = tagList[gbnIdx];
    for (var j = 0; j < tags.length; j++) {
        sel.append("<option value='" + tags[j].id + "'>" + tags[j].val + "</option>");
    }
}

function countMyself() {

    if ( typeof countMyself.counter == 'undefined' ) {

        countMyself.counter = 3;
    }
    return ++countMyself.counter;
}
function addRow(obj) {
    let idxx=countMyself();
    var len = $("#detail_search_gbn").find("div").length;
    var idx = len - 2;
    var rowHtml = $("#detail_search_gbn").find("div").eq(1).clone().html();
    rowHtml=rowHtml.replace(/id=\"(.){2}\"/gm,"id="+idxx+'0'+"\"")
    $("#detail_search_gbn").find("div").eq(idx).after("<div class='mt10' id='sel_tag_gbn1_" + (idx + 1) + "'>" + rowHtml + "</div>");

    $("#sel_tag_gbn1_" + (idx + 1)).find("select").change(function () {
        changeTagGbn(this);
    });

    rowHtml = $("#detail_search_tag").find("div").eq(1).clone().html();
    rowHtml=rowHtml.replace(/id=\"(.){2}\"/gm,"id="+idxx+'1'+"\"")
    $("#detail_search_tag").find("div").eq(idx).after("<div class='mt10' id='sel_tag_gbn2_" + (idx + 1) + "'>" + rowHtml + "</div>");

    rowHtml = $("#detail_search_txt").find("div").eq(1).clone().html();

    rowHtml=rowHtml.replace(/id=\"(.){2}\"/,"id="+idxx+'2'+"\"")
    rowHtml=rowHtml.replace(/id="(.)4"/,"id="+idxx+'3'+"\"")
    $("#detail_search_txt").find("div").eq(idx).after("<div class='mt10'>" + rowHtml + "</div>");

    console.log(":::::::::::::::::::::::::::::::::::::::::::::::::::::::::")
    console.log(idxx)
    console.log(":::::::::::::::::::::::::::::::::::::::::::::::::::::::::")

}

/* 글 검색 */






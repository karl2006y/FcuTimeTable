
<script>
// var filedata = $('.start-time, .end-time, .Location').text();
// window.open( "data:text/calendar;charset=utf8," + escape( filedata ) );

export default {
  name: "icsComponents",
  props: {
    classTimeDetail: Array
  },
  data() {
    return {
      // classTimeDetail:[{
      //   strBT:'20190215T092000',
      //   strET:'20190215T095000',
      //   uid:'123',
      //   courseInfo:'老師1',
      //   place:'位置1',
      //   courseName:'課名1',
      //   min:'10'
      // },
      // {
      //   strBT:'20190215T102000',
      //   strET:'20190215T105000',
      //   uid:'12345',
      //   courseInfo:'老師1',
      //   place:'位置1',
      //   courseName:'課名1',
      //   min:'10'
      // },

      // ],
      ical: ""
    };
  },
  methods: {
    dowloadIcsHandler() {
      // window.open( this.ical);
      // var blob = new Blob(['\ufeff' + ics], {type: 'text/calendar,charset=UTF-8'})
      // openDownloadDialog(blob, 'test2')
    }
  },
  created() {
    var CalSrart =
      "BEGIN:VCALENDAR\nPRODID:-//HeYSH//THU Calendar 0.0002//CN\nVERSION:2.0\nCALSCALE:GREGORIAN\nMETHOD:PUBLISHnX-WR-CALNAME:课程表\nX-WR-TIMEZONE:Asia/Shanghai\nX-WR-CALDESC:\nBEGIN:VTIMEZONE\nTZID:Asia/Shanghai\nX-LIC-LOCATION:Asia/Shanghai\nBEGIN:STANDARD\nTZOFFSETFROM:+0800\nCOLOR:34:50:105\nTZOFFSETTO:+0800\nTZNAME:CST\nDTSTART:19700101T000000\nEND:STANDARD\nEND:VTIMEZONE\n";
    /***************生成文件头****************/
    var allData = "";
    for (var i = 0; i < this.classTimeDetail.length; i++) {
      var detail = this.classTimeDetail[i];
      var strBT = detail.strBT;
      var strET = detail.strET;
      var uid = detail.uid;
      var courseInfo = detail.courseInfo;
      var place = detail.place;
      var courseName = detail.courseName;
      var min = detail.min;

      var vCalArea =
        "BEGIN:VEVENT\nDTSTART;TZID=Asia/Shanghai:" +
        strBT +
        "\nDTEND;TZID=Asia/Shanghai:" +
        strET +
        "\nDTSTAMP:20120622T160054Z\nUID:" +
        uid +
        "\nCREATED:20120622T154824Z\nDESCRIPTION:" +
        courseInfo +
        "\nLAST-MODIFIED:20120622T160041Z\nBEGIN:VALARM\nACTION:DISPLAY\nDESCRIPTION:This is an event reminder\nTRIGGER:-P0DT0H" +
        min +
        "M0S\nEND:VALARM\nLOCATION:" +
        place +
        "\nSTATUS:CONFIRMED\nSUMMARY:" +
        courseName +
        "\nEND:VEVENT\n";

      allData = allData + vCalArea;
    }

    /****************VEVENT部分***************/
    var CalEnd = "END:VCALENDAR";
    /****************文件尾****************/

    this.ical = CalSrart + allData + CalEnd;
    var blob = new Blob([this.ical], { type: "text/calendar" });
    this.ical = URL.createObjectURL(blob);
    // this.ical = (  (CalSrart)+ (allData) + (CalEnd));
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>

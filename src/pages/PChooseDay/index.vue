<script>
import lamp from "@/components/lottie/lamp.json";
import IcsComponents from "@/components/IcsComponents";

export default {
  name: "pChooseDay",
  components: {
    IcsComponents
  },
  props: {
    classWeekList: Array
  },

  data() {
    return {
      startDay: "2019-02-18",
      endDay: "",
      allweek: [[], [], [], [], [], [], [], []],
      classSorted: [],
      lampOptions: { animationData: lamp },
      timeRangeRadio: "2week",
      min: 15,
      note: "小白製作~"
    };
  },
  watch: {
    timeRangeRadio() {
      // this.getIcs();
      this.classSorted = [];
    }
  },
  methods: {
    getToday() {
      var Today = new Date();
      this.startDay =
        Today.getFullYear() +
        "-" +
        (Today.getMonth() + 1 < 10 ? "0" : "") +
        (Today.getMonth() + 1) +
        "-" +
        (Today.getDate() + 1 < 10 ? "0" : "") +
        Today.getDate();
    },
    getIcs() {
      this.classSort_day();
      this.classSort();
    },
    classSort() {
      //console.log("!!!!!!");

      var classDetail = {
        strBT: "",
        strET: "",
        uid: "",
        courseInfo: "",
        place: "",
        courseName: "",
        min: ""
      };
      for (var i = 1; i <= 7; i++) {
        for (var j = 0; j < this.allweek[i].length; j++) {
          var currentDay = this.allweek[i][j];
          //console.log(currentDay);

          for (var k = 0; k < this.classWeekList[i].length; k++) {
            //console.log(k);

            var current = this.classWeekList[i][k];
            var timeOrg = current.PeriodTime.replace(":", "").replace(":", "");
            var startTime = currentDay + "T" + timeOrg.split("~")[0] + "00";
            var endTime = currentDay + "T" + timeOrg.split("~")[1] + "00";
            var subName = current.SubName;
            var romName = current.RomName;
            var uni =
              startTime +
              current.SctWeek.toString() +
              current.SctPeriod.toString();
            //console.log(uni);
            classDetail.strBT = startTime;
            (classDetail.strET = endTime),
              (classDetail.uid = uni),
              (classDetail.courseInfo =
                "授課教師：" + current.TeacherName + "\\n" + this.note),
              (classDetail.place = romName),
              (classDetail.courseName = subName),
              (classDetail.min = this.min);
            this.classSorted.push(classDetail);
            classDetail = {
              strBT: "",
              strET: "",
              uid: "",
              courseInfo: "",
              place: "",
              courseName: "",
              min: ""
            };
          }

          classDetail.strBT = this.endDay + "T080000";
          (classDetail.strET = this.endDay + "T180000"),
            (classDetail.uid = "lastdaytneedupday"),
            (classDetail.courseInfo =
              "請記得回來更新課表\\nhttps://fcutimetable--karl2015y.repl.co/#/"),
            (classDetail.place = ""),
            (classDetail.courseName = "更新課表"),
            (classDetail.min = "");
          this.classSorted.push(classDetail);
        }
      }
    },
    classSort_day() {
      if (this.timeRangeRadio == "1week") {
        var deltaday = 7;
      } else if (this.timeRangeRadio == "2week") {
        var deltaday = 14;
      } else if (this.timeRangeRadio == "3week") {
        var deltaday = 21;
      } else if (this.timeRangeRadio == "4week") {
        var deltaday = 28;
      }
      var firstDatMs = new Date() * 1;

      var dayms = 1000 * 60 * 60 * 24;

      for (var i = 0; i < deltaday; i++) {
        var dayNum = firstDatMs + dayms * i;
        // 第一天加上i天
        var current = new Date(dayNum);

        // 當前在第current天
        var currentYear = current.getFullYear().toString();
        var currentMount =
          (current.getMonth() + 1 < 10 ? "0" : "") +
          (current.getMonth() + 1).toString();
        var currentDate =
          (current.getDate() + 1 < 10 ? "0" : "") +
          current.getDate().toString();
        var currentDay = current.getDay() == 0 ? 7 : current.getDay();
        var currentDateAll = currentYear + currentMount + currentDate;
        if (i == deltaday - 2) {
          this.endDay = currentDateAll;
        }

        this.allweek[currentDay].push(currentDateAll);
      }
    }
  },
  created() {
    this.getToday();
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>

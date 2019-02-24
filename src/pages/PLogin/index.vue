<script>
export default {
  name: "pLogin",
  data() {
    return {
      loading: false,
      classTable: {},
      username: "",
      password: "",
      lngType: "tw",
      first: true,
      teachersName: [],
      apitimes: 2
    };
  },
  watch: {
    teachersName() {
      this.apitimes--;
      if (this.apitimes < 1) {
        this.$emit("loading-change", false);
        (this.loading = false), (this.first = false);
        for (var i = 0; i < this.classTable.TimetableTw.length; i++) {
          var ScrSelcode = this.classTable.TimetableTw[i].ScrSelcode;
          for (var j = 0; j < this.teachersName.length; j++) {
            var classId = this.teachersName[j].classId;
            if (classId == ScrSelcode) {
              if (
                !!this.classTable.TimetableTw[i].RomName ==
                this.teachersName[j].name
              ) {
                this.classTable.TimetableTw[i].TeacherName = "No";
              } else {
                this.classTable.TimetableTw[i].TeacherName = this.teachersName[
                  j
                ].name;
              }
            }
          }
        }
        this.golalaNextPage();
      }
    },
    classTable() {
      if (this.classTable.Success) {
        if (this.lngType == "tw") {
          this.$emit("get-classTable", this.classTable.TimetableTw);
        } else {
          this.$emit("get-classTable", this.classTable.TimetableEn);
        }

        var c_Id = "";
        for (var i = 0; i < this.classTable.TimetableTw.length; i++) {
          c_Id = c_Id + "|" + this.classTable.TimetableTw[i].ScrSelcode + "";
        }
        this.getTeacherName(c_Id);
      } else {
        this.$emit("loading-change", false);
        (this.loading = false), (this.first = false);
      }
    }
  },
  methods: {
    getClassTableHandler() {
      this.username = this.username.toUpperCase();
      const api =
        `https://script.google.com/macros/s/AKfycbz5Tv1nxmmngpqn6R1cz90-L7A5h8qU_l6idVdxb-lwUnFGjOU/exec?username=` +
        encodeURI(this.username) +
        `&password=` +
        encodeURIComponent(this.password);
      //console.log(api);
      this.$emit("loading-change", true);
      this.loading = true;
      this.$http.get(api).then(response => {
        this.classTable = response.data;
      });
    },
    getTeacherName(c_Id) {
      const api =
        `https://script.google.com/macros/s/AKfycbxJnY7_pTfSiNGsY1UaJWBOXSRbWGiLBgC9k_X-_TftFWUPyJ-3/exec?data=` +
        encodeURI(c_Id);
      const api2 =
        `https://script.google.com/macros/s/AKfycbyggZpXp-od-ljkKwGcPUpxCnuayz4R4zZUS0I1jg/exec?data=` +
        encodeURI(c_Id);
      this.$http.get(api).then(response => {
        this.teachersName = this.teachersName.concat(response.data);
        //console.log(api);
      });
      this.$http.get(api2).then(response => {
        this.teachersName = this.teachersName.concat(response.data);

        //console.log(api2);
      });
    },

    golalaNextPage() {
      this.$router.push({
        name: "timetable"
      });
    }
  }
};
</script>

<template src="./template.html"></template>
<style lang="scss" src="./style.scss" scoped></style>

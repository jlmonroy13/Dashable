
(function () { 
  angular
    .module('CheckIn')
    .factory('getweeksFactory', getweeksFactory);

    getweeksFactory.$inject = ['$moment'];

    function getweeksFactory($moment) {
      var date,
          day,
          numberDay,
          saturday,
          daysToSaturday,
          referenceDay,
          days2Saturday,
          weeks = [],
          factory = {
            get2weeks: get2weeks
          };

      return factory;
      
      function get2weeks(data) {
        referenceDay = data;
        weeks = [];
        saturday = $moment(referenceDay).day("Saturday");
        console.log(saturday);
        days2Saturday = moment(saturday).to(referenceDay, true);
        console.log(days2Saturday);
        daysToSaturday = parseInt(days2Saturday);
        console.log(daysToSaturday);
        if(isNaN(daysToSaturday)) {
          if(days2Saturday == 'a day') {
            daysToSaturday = 1;
          }else {
            daysToSaturday = 0;
          }
          
        }
        //Get last 12 days from now 
        weeks.push(
          {day: $moment(referenceDay).format('dddd'), numberday: $moment(referenceDay).format('D'), dateToDisplay: $moment(referenceDay).format('dddd, MMM D'), date: $moment(referenceDay).format('YYYY-MM-DD'), selected: true, checkin: false, future: false});
        if(daysToSaturday == 6) {
          getLastWeek(6);
        }else if(daysToSaturday == 5) {
          getLastWeek(3);
        }else if(daysToSaturday == 4) {
          getLastWeek(5);
        }else if(daysToSaturday == 3) {
          getLastWeek(7);
        }else if(daysToSaturday == 2) {
          getLastWeek(9);
        }else if(daysToSaturday == 1) {
          getLastWeek(11);
        }else if(daysToSaturday == 0) {
          getLastWeek(13);
        }
        //Get days since today to Saturday
        for(var i=1; i < daysToSaturday+1; i++) {
          date = $moment(referenceDay).add(i, 'days').format('YYYY-MM-DD');
          day = $moment(referenceDay).add(i, 'days').format('dddd');
          numberDay = $moment(referenceDay).add(i, 'days').format('D');
          dateToDisplay = $moment(referenceDay).add(i, 'days').format('dddd, MMM D');
          weeks.unshift({day: day, numberday: numberDay, dateToDisplay: dateToDisplay, date: date, selected: false, checkin: false, future: true});
        }
        //Delete Sundays
        weeks = $.grep(weeks, function(data){
          return data.day != 'Sunday';
        });
        console.log(weeks);
        return weeks;
      }
      function getLastWeek(days) {
        for(var i=1; i<daysToSaturday+days; i++) {
          date = $moment(referenceDay).subtract(i, 'days').format('YYYY-MM-DD');
          day = $moment(referenceDay).subtract(i, 'days').format('dddd');
          numberDay = $moment(referenceDay).subtract(i, 'days').format('D');
          dateToDisplay = $moment(referenceDay).subtract(i, 'days').format('dddd, MMM D');
          weeks.push({day: day, numberday: numberDay, dateToDisplay: dateToDisplay, date: date, selected: false, checkin: false, future: false});
        }
      }
    }
})();
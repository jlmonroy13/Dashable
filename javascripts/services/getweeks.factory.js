
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
          weeks = [],
          factory = {
            get2weeks: get2weeks
          };

      return factory;
      
      function get2weeks() {
        weeks = [];
        saturday = moment().day("Saturday");
        daysToSaturday = parseInt(moment(saturday).toNow());
        //Get last 12 days from now 
        weeks.push({day: moment().format('dddd'), numberday: moment().format('D'), date: moment().format('YYYY-MM-DD'), today: true, checkin: false, future: false});
        for(var i=1; i<11; i++) {
          date = moment().subtract(i, 'days').format('YYYY-MM-DD');
          day = moment().subtract(i, 'days').format('dddd');
          numberDay = moment().subtract(i, 'days').format('D');
          weeks.push({day: day, numberday: numberDay, date: date, today: false, checkin: false, future: false});
        }
        //Get days since today to Saturday
        for(var i=1; i < daysToSaturday+1; i++) {
          date = moment().add(i, 'days').format('YYYY-MM-DD');
          day = moment().add(i, 'days').format('dddd');
          numberDay = moment().add(i, 'days').format('D');
          weeks.unshift({day: day, numberday: numberDay, date: date, today: false, checkin: false, future: true});
        }
        //Delete Sundays
        weeks = $.grep(weeks, function(data){
          return data.day != 'Sunday';
        });
        return weeks;
      }
    }
})();
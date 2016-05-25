
(function () { 
  angular
    .module('CheckIn')
    .factory('getweeksFactory', getweeksFactory);

    getweeksFactory.$inject = ['$moment'];

    function getweeksFactory($moment) {
      var day,
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
        weeks.push({day: moment().format('dddd'), numberday: moment().format('D'), today: true});
        for(var i=1; i<11; i++) {
          day = moment().subtract(i, 'days').format('dddd');
          numberDay = moment().subtract(i, 'days').format('D');
          weeks.push({day: day, numberday: numberDay, today: false});
        }
        //Get days since today to Saturday
        for(var i=1; i < daysToSaturday+1; i++) {
          day = moment().add(i, 'days').format('dddd');
          numberDay = moment().add(i, 'days').format('D');
          weeks.unshift({day: day, numberday: numberDay, today: false});
        }
        //Delete Sundays
        weeks = $.grep(weeks, function(data){
          return data.day != 'Sunday';
        });
        return weeks;
      }
    }
})();
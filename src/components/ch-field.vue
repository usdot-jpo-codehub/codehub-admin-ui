<template>
  <div class="ch-field--wrapper">
    <span class="ch-field--label">
      {{ label }}
    </span>
    <span v-if="islink" class="ch-field--value" :class="[sizeClass, weightClass, colorClass, shadowClass]" >
      <a :href="value" target="_blank">{{ value }}</a>
    </span>
    <span v-else-if="isTime" class="ch-field--value" :class="[sizeClass, weightClass, colorClass, , shadowClass]" >
      {{ value | fildate }}
    </span>
    <span v-else class="ch-field--value" :class="[sizeClass, weightClass, colorClass, , shadowClass]" >
      {{ value }}
    </span>
  </div>
</template>
<script>
import moment from 'moment';

export default {
  name: 'CHField',
  props: ['label','value','size', 'weight', 'color', 'link', 'shadow', 'time'],
  filters: {
    fildate: function(date) {
      if (date) {
        return moment(date).format('YYYY-MM-DDTHH:mm:ss')+'Z';
      }
      return '';
    }
  },
  computed: {
    isTime: { get: function() {return this.time === 'true'}},
    islink: {
      get: function() {return this.link === 'true';}
    },
    shadowClass: {
      get: function() {
        if (this.shadow === 'true') {
          return 'ch-field--value-shadow';
        } else {
          return '';
        }
      }
    },
    sizeClass : {
      get: function() {
        if (this.size === 'smaller') {
          return 'ch-field--value-smaller';
        } else if (this.size === 'small') {
          return 'ch-field--value-small';
        } else if (this.size === 'large') {
          return 'ch-field--value-large';
        } 
        return 'ch-field--value-medium';
      }
    },
    weightClass : {
      get: function() {
        if (this.weight === 'bold') {
          return 'ch-field--value-bold';
        } 
        return 'ch-field--value-normal';
      }
    },
    colorClass : {
      get: function() {
        if (this.color === 'blue') {
          return 'ch-field--value-blue';
        } else if (this.color === 'green') {
          return 'ch-field--value-green'
        } else if (this.color === 'navy') {
          return 'ch-field--value-navy'
        } else if (this.color === 'gray') {
          return 'ch-field--value-gray'
        } else if (this.color === 'lightgray') {
          return 'ch-field--value-lightgray'
        } else if (this.color === 'red') {
          return 'ch-field--value-red'
        } else {
          return 'ch-field--value-black';
        }
      }
    }
  }
}
</script>
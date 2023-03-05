import type { NextObserver } from "rxjs";
import type { Ref } from "vue";

export function toObserver<T>(valueRef: Ref<T>): NextObserver<T> {
  return {
    next: (val: T) => {
      valueRef.value = val;
    },
  };
}

// <script setup lang="ts">
// import type { Ref } from 'vue'
// import { ref } from 'vue'
// import { interval } from 'rxjs'
// import {
//   map,
//   mapTo,
//   startWith,
//   takeUntil,
//   withLatestFrom,
// } from 'rxjs/operators'
// import { useSubscription } from '../useSubscription'
// import { from, fromEvent } from '../from'
// import { toObserver } from './toObserver'

// const count = ref(0)
// const button = ref<HTMLButtonElement | null>(null)

// useSubscription(
//   interval(1000)
//     .pipe(
//       mapTo(1),
//       takeUntil(fromEvent(button as Ref<HTMLButtonElement>, 'click')),
//       withLatestFrom(from(count).pipe(startWith(0))),
//       map(([total, curr]) => curr + total),
//     )
//     .subscribe(toObserver(count)),
// )
// </script>

// <template>
//   <button @click="count++">
//     count is: {{ count }}
//   </button>
//   <button ref="button">
//     stop
//   </button>
// </template>

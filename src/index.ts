import _ from 'lodash';
import { from, Observable, of, Subject } from 'rxjs';
import { reduce } from 'rxjs/operators';

interface Task {
  type: string;
}

type Result = object | boolean | string | number | undefined;

interface Payload {
  params?: Result;
}

interface Action {
  id: string;
  queue: Array<Task | string>;
}

async function runTask(payload: Payload, task: Task): Promise<Result> {
  const calc = _.add(payload.params as number, 1);
  console.log(task.type, calc);
  return calc;
}

const actions: { [key: string]: Action } = {
  '1': {
    id: '1',
    queue: [
      {
        type: 'TASK1-1',
      },
      {
        type: 'TASK1-2',
      },
      '2',
    ],
  },
  '2': {
    id: '2',
    queue: [
      {
        type: 'TASK2-1',
      },
    ],
  },
};

const run$ = from(actions['1'].queue).pipe(
  reduce<Task | string, Observable<Result>>((acc, value) => {
    const subject = new Subject<Result>();

    acc.subscribe((result) =>
      runTask({ params: result }, value).then((r) => {
        subject.next(r);
        subject.complete();
      }),
    );

    return subject;
  }, of(0)),
);

run$.subscribe({
  next: (result$) =>
    result$.subscribe((result) => console.log('result is: ', result)),
});

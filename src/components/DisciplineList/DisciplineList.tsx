import { Collapse } from 'antd';
import { v4 } from 'uuid';

export const DisciplineList = () => {
  const disciplines = [{ id: v4(), name: "test", duration: 120 }];

  return (
    <>
      {(disciplines ?? []).map(({ id, name, duration }) => (
        <Collapse key={id}>
          <div>{name}</div>
          <div>{duration}</div>
        </Collapse>
      ))
      }
    </>
  )
}
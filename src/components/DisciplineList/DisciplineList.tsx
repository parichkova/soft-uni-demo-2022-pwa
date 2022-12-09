import { useEffect, useState } from "react";
import { Collapse, Col, Row } from "antd";
import { Discipline } from "~/types/types";
import { getDisciplines } from "~/utilities/create-new-discipline";

export const DisciplineList = () => {
  const { Panel } = Collapse;
  const [disciplines, setDisciplines] = useState<Array<Discipline>>([]);

  useEffect(() => {
    getDisciplines().then((disciplines) => setDisciplines(disciplines));
  }, []);

  // We are asking for notification permission here since this is a demo app.
  // But ideally, we should not be doing it here as it accounts for bad UX.
  useEffect(() => {
      if (!('Notification' in window)) {
        console.log('Notifications not supported');
      }

      if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            new Notification('Welcome');
          }
        });
      }
  }, []);

  return (
    <>
      {(disciplines).map(({ id, name, description, duration, imageUrl }) => (
        <Collapse key={id}>
          <Panel key={id} header={name}>
          <Row>
            <Col span={12}>
              <p>
                <strong>Name:&nbsp;</strong>
                <span>{name}</span>
              </p>
              {description && (
                <p>
                  <strong>Description:&nbsp;</strong>
                  <span>{description}</span>
                </p>
              )}
              <p>
                <strong>Duration:&nbsp;</strong>
                <span>{duration}</span>
              </p>
            </Col>
            <Col span={12}>
                {imageUrl && <div className="col-6">
                  <img src={imageUrl} alt={name} width="50" height="50" />
                </div>}
            </Col>
          </Row>
          </Panel>
        </Collapse>
      ))}
    </>
  );
};

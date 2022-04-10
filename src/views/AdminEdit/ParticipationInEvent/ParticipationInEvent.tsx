import React, { useState } from 'react';
import { FoodtruckState } from 'types/Foodtrucktypes';
import { Box, Tab, Tabs } from '@mui/material';
import EventsSearchBar from 'components/organisms/EventsSearchBar/EventsSearchBar';
import { events } from 'data/events';
import SubmitEvent from 'components/molecules/SubmitEvent/SubmitEvent';
import TextButton from 'components/atoms/TextButton/TextButton';
import Loader from 'components/atoms/Loader/Loader';
import ResponseP from 'components/atoms/ResponseP/ResponseP';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  className?: string;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, className, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: '24px 0' }} className={className}>
          {children}
        </Box>
      )}
    </div>
  );
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

const ParticipationInEvent = ({ foodtruck }: { foodtruck: FoodtruckState }) => {
  const [value, setValue] = React.useState(0);
  const [isSubmitEventsVisible, setIsSubmitEventsVisible] = useState<boolean[]>([]);
  const [isSubmitEventSuccess, setIsSubmitEventSuccess] = useState<boolean>(false);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleOnEventClick = (index: number) => {
    const btn = document.querySelector(`#submit-btn-${index}`);
    if (isSubmitEventsVisible[index]) {
      btn?.classList.add('opacity-0');
      setTimeout(() => {
        btn?.classList.add('!hidden');
      }, 400);

      const newTable = isSubmitEventsVisible;
      newTable[index] = false;
      setIsSubmitEventsVisible(newTable);
    } else {
      btn?.classList.remove('!hidden');
      setTimeout(() => {
        btn?.classList.remove('opacity-0');
      }, 200);

      const newTable = isSubmitEventsVisible;
      newTable[index] = true;
      setIsSubmitEventsVisible(newTable);
    }
  };

  const showResponse = (index: number) => {
    const res = document.querySelector(`#submit-res-${index}`) as HTMLParagraphElement;

    setTimeout(() => {
      res?.classList.remove('!hidden');
      setTimeout(() => {
        res?.classList.remove('opacity-0');
      });
    }, 500);
  };

  const handleOnClickSubmitBtn = (eventId: string, foodtruckId: string, index: number) => {
    const btn = document.querySelector(`#submit-btn-${index}`) as HTMLButtonElement;

    btn.style.transition =
      'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1), width 150ms cubic-bezier(0.4, 0, 0.2, 1)';
    btn.style.width = '85%';
    btn.disabled = true;

    setTimeout(() => {
      btn.style.width = '100%';
      setTimeout(() => {
        btn.style.transition = 'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1)';
        btn.disabled = false;
        handleOnEventClick(index);
        setIsSubmitEventSuccess(true);
        showResponse(index);
      }, 300);
    }, 3000);
  };

  return (
    <>
      <div className="text-white overflow-auto relative" style={{ maxHeight: '740px' }}>
        <Box
          sx={{ borderBottom: 1, borderColor: 'divider' }}
          className={'sticky top-0 bg-lightBlack z-10'}
        >
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Zgłoś udział" {...a11yProps(0)} />
            <Tab label="Moje wydarzenia" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel className={`grid gap-4 justify-items-center`} value={value} index={0}>
          <EventsSearchBar isSubmitEvents />
          <p className={'w-full font-semibold text-lg'}>Proponowane Wydarzenia</p>
          {events.map((event, index) => {
            return (
              <div
                className={'w-full grid justify-items-center relative'}
                key={`submit-event-${index}`}
              >
                <SubmitEvent
                  className={'mb-3'}
                  event={event}
                  onClick={() => handleOnEventClick(index)}
                />
                <TextButton
                  id={`submit-btn-${index}`}
                  classNames={
                    'bg-gold text-darkBlack w-full opacity-0 !hidden justify-self-end disabled:opacity-70'
                  }
                  onClick={() => handleOnClickSubmitBtn(event.id, foodtruck.id, index)}
                >
                  <p>Zgłoś Udział</p>
                  <Loader className={'max-w-8 absolute bottom-1 left-1.5'} />
                </TextButton>
                <ResponseP
                  id={`submit-res-${index}`}
                  className={'!hidden opacity-0'}
                  isSuccess={isSubmitEventSuccess}
                  message={'Twój foodtruck został zgłoszony do eventu.'}
                />
              </div>
            );
          })}
        </TabPanel>
        <TabPanel className={`grid gap-4 justify-items-center`} value={value} index={1}>
          <p className={'w-full font-semibold text-lg'}>Wydarzenia w których bierzesz udział</p>
          {events.map((event, index) => {
            return (
              <div
                className={'w-full grid justify-items-center relative'}
                key={`submit-event-${index}`}
              >
                <SubmitEvent
                  className={'mb-3'}
                  event={event}
                  onClick={() => handleOnEventClick(index)}
                />
                <TextButton
                  id={`submit-btn-${index}`}
                  classNames={
                    'bg-gold text-darkBlack w-full opacity-0 !hidden justify-self-end disabled:opacity-70'
                  }
                  onClick={() => handleOnClickSubmitBtn(event.id, foodtruck.id, index)}
                >
                  <p>Anuluj Udział</p>
                  <Loader className={'max-w-8 absolute bottom-1 left-1.5'} />
                </TextButton>
                <ResponseP
                  id={`submit-res-${index}`}
                  className={'!hidden opacity-0'}
                  isSuccess={isSubmitEventSuccess}
                  message={'Udział Twojego foodtrucka został anulowany.'}
                />
              </div>
            );
          })}
        </TabPanel>
      </div>
    </>
  );
};

export default ParticipationInEvent;

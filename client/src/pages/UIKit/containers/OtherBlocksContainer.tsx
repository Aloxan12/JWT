import React, { useEffect, useLayoutEffect, useState } from 'react';
import { AppCard } from '../../../shared/ui/AppCard/AppCard';
import { Flex } from '../../../shared/ui/Flex/Flex';
import { AppInput } from '../../../shared/ui/AppInput/AppInput';
import { AppTextarea } from '../../../shared/ui/AppTextarea/AppTextarea';
import { AppDragAndDrop } from '../../../shared/ui/AppDragAndDrop/AppDragAndDrop';
import { AppDragAndDropPhoto } from '../../../shared/ui/AppDragAndDrop/AppDragAndDropPhoto';
import { useParams, useSearchParams } from 'react-router-dom';
import { AppButton } from '../../../shared/ui/AppButton/AppButton';

const path = '?orderId=1234';

interface IOrder {
  id: number;
  count: number;
  title: string;
  price: number;
}

export const OtherBlocksContainer = () => {
  const [value, setValue] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const { orderId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const data: any[] = [{ id: 1234, title: 'aaa', price: 10 }]; // async

  const [order, setOrder] = useState<IOrder[]>([]);

  useEffect(() => {
    if (!!data && !!orderId) {
      const findedOrder = data.find((item) => item.id === orderId);
      setOrder([
        {
          id: findedOrder.id as number,
          count: 1,
          title: `${findedOrder.title}`,
          price: findedOrder.price,
        },
      ]);
      searchParams.delete('orderId');
      setSearchParams(searchParams.toString());
    }
  }, [data]);

  const currentID = 1234;
  const currentTitle = '1234';
  const currentPrice = 123;
  return (
    <AppCard withoutBorder title="Общие блоки">
      <Flex gap="16">
        <AppButton
          text={order.find((item) => item.id === currentID) ? '+1' : 'Add'}
          onClick={() => setOrder((prevState) => {})} // либо добавить обьект либо добавить каунт
        />
        <AppDragAndDropPhoto file={file} setFile={setFile} />
        <AppDragAndDrop file={file} setFile={setFile} />
        <Flex max align="start">
          <Flex direction="column">
            <AppInput label="Лейбл" placeholder="Введите текст" value={value} onChange={setValue} />
            <AppInput placeholder="Введите текст" value={value} onChange={setValue} />
            <AppInput placeholder="Введите текст" value={value} onChange={setValue} />
          </Flex>
          <AppTextarea
            label="Лейбл"
            placeholder="Введите текст"
            value={value}
            onChange={setValue}
            rows="3"
          />
        </Flex>
      </Flex>
    </AppCard>
  );
};

interface AppButtonPashaProps {
  count: number;
}

const AppButtonPasha = ({ count }: AppButtonPashaProps) => {
  if (count) {
    return <div>- {count} +</div>;
  } else <div>Добавить</div>;
};

import { useAsyncList } from '@react-stately/data';
import useAxiosPrivate from './useAxiosPrivate';
import { useState } from 'react';

const useSuplementryList = () => {
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const axiosPrivate = useAxiosPrivate()
  const[hasMore,setHasMore] = useState(false)
  let products = useAsyncList({
    async load({ signal, cursor }) {
      try {
        if (cursor) {
          setPage((prev) => prev + 1);
        }

        const skip = cursor ? cursor : 0;
        const response = await axiosPrivate.get('/suplementry', {
          params: { skip },
          signal,
        } );


        const { success, data } = response.data;

        if (!success) {
          throw new Error('Failed to fetch products');
        }

        if (skip + data.suplementry.length >= data.count) {
          setHasMore(false);
        }

        if (!cursor) {
          setIsLoading(false);
        }

        return {
          items: data.suplementry,
          cursor: skip + 10, // Assuming PAGE_NUMBER is 10, this sets the next skip value.
        };
      } catch (error) {
        console.error('Failed to load products:', error);
        throw error;
      }
    },
  });

  return { products, page, isLoading,hasMore };
}

export default useSuplementryList
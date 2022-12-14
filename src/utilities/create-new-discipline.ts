import { Discipline } from '../types/types';
import { cacheName, mockarooBaseUrl } from '../constants';
import { getServerUrl } from './utilities';

const headers = { 'Content-Type': 'application/json' };

const updateCaches = async (discipline: Discipline) => {
  try {
    const disciplinesAppCache = await caches.open(cacheName);
    const cachedDisciplines = await disciplinesAppCache.match(
      `${mockarooBaseUrl}/disciplines.json`,
      { ignoreVary: true, ignoreSearch: true }
    );

    if (cachedDisciplines != null) {
      const cachedDisciplinesParsed = (await cachedDisciplines?.json()) as Discipline[];

      await disciplinesAppCache.put(
        new Request(cachedDisciplines.url, { method: 'GET', headers }),
        new Response(JSON.stringify([...cachedDisciplinesParsed, discipline]), {
          headers
        })
      );
    }
  } catch (e) {
    console.log('Issues retrieving requests from the cache');
  }
}

export const createDiscipline = async (discipline: Discipline) => {
  await updateCaches(discipline);

  try {
    const AddDisciplineQuery = await fetch(getServerUrl('/discipline'), {
      method: 'POST',
      body: JSON.stringify(discipline)
    });

    return (await AddDisciplineQuery.json()) as Discipline;
  } catch (error: any) {
    return {};
  }
};

export const getDisciplines = async () => {
  try {
    const getDisciplinesQuery = await fetch(getServerUrl('/disciplines'), { method: 'GET' });

    return (await getDisciplinesQuery.json()) as Discipline[];
  } catch (error) {
    return [];
  }
};

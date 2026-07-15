export interface Cluster {
  id: string;
  name: string;
  color: string;
  stripeColor: string;
  admin: string;
}

export const clusters: Cluster[] = [
  { id: 'A', name: 'Holdings & Corporate', color: '#D4652A', stripeColor: 'border-l-orange', admin: 'fabiola' },
  { id: 'B', name: 'Southern Desert', color: '#9A6E1A', stripeColor: 'border-l-amber', admin: 'jemilah' },
  { id: 'C', name: 'Coastal & West', color: '#1A5FA5', stripeColor: 'border-l-blue', admin: 'hilma' },
  { id: 'D', name: 'Etosha & Northern', color: '#2D7A4F', stripeColor: 'border-l-green', admin: 'hilma' },
  { id: 'E', name: 'Waterways', color: '#0F6E56', stripeColor: 'border-l-teal', admin: 'jemilah' },
];

export const getClusterById = (id: string): Cluster | undefined => {
  return clusters.find(cluster => cluster.id === id);
};

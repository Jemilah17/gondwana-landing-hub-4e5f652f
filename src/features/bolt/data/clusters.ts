export interface Cluster {
  id: string;
  name: string;
  color: string;
  stripeColor: string;
  admin: string;
}

export const clusters: Cluster[] = [
  { id: 'A', name: 'Corporate & Holdings', color: '#D4652A', stripeColor: 'border-l-orange', admin: 'alex' },
  { id: 'B', name: 'Manufacturing', color: '#9A6E1A', stripeColor: 'border-l-amber', admin: 'taylor' },
  { id: 'C', name: 'Logistics & Distribution', color: '#1A5FA5', stripeColor: 'border-l-blue', admin: 'jordan' },
  { id: 'D', name: 'Property & Retail', color: '#2D7A4F', stripeColor: 'border-l-green', admin: 'jordan' },
  { id: 'E', name: 'Services & Technology', color: '#0F6E56', stripeColor: 'border-l-teal', admin: 'taylor' },
];

export const getClusterById = (id: string): Cluster | undefined => {
  return clusters.find(cluster => cluster.id === id);
};

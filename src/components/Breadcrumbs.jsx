import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export default function Breadcrumbs({ items }) {
  return (
    <Breadcrumb separator="›" fontSize="sm" mb={3} color="gray.600">
      {items.map((item, i) => {
        const current = i === items.length - 1;
        return (
          <BreadcrumbItem key={item.label} isCurrentPage={current}>
            {current ? (
              <BreadcrumbLink fontWeight="600" color="glacier.900">{item.label}</BreadcrumbLink>
            ) : (
              <BreadcrumbLink as={RouterLink} to={item.to}>{item.label}</BreadcrumbLink>
            )}
          </BreadcrumbItem>
        );
      })}
    </Breadcrumb>
  );
}

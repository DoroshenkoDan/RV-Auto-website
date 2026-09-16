import { revalidatePath } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  RequestContext,
} from "payload";

function revalidateCatalog(context: RequestContext) {
  if (context.disableRevalidate) return;

  revalidatePath("/(frontend)/[locale]", "page");
  revalidatePath("/(frontend)/[locale]/cars", "page");
  revalidatePath("/(frontend)/[locale]/cars/[slug]", "page");
}

export const revalidateCatalogAfterChange: CollectionAfterChangeHook = ({
  doc,
  req,
}) => {
  revalidateCatalog(req.context);
  return doc;
};

export const revalidateCatalogAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req,
}) => {
  revalidateCatalog(req.context);
  return doc;
};

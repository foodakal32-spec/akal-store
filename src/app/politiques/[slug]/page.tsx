import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteHeader from "../../components/site-header";
import PolicyView from "../../components/policy-view";
import LogoCloudSection from "../../sections/logo-cloud-section";
import { getPolicy, policies } from "../../policies";

export function generateStaticParams() {
  return policies.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) return {};
  return { title: `${policy.fr.title} — AKAL أكال`, description: policy.fr.intro };
}

export default async function PolicyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const policy = getPolicy(slug);
  if (!policy) notFound();

  return (
    <main className="w-full min-h-screen theme-beige">
      <section className="w-full">
        <SiteHeader plainNav />
      </section>
      <section className="w-full px-10 py-14 max-lg:px-5 max-lg:py-10">
        <div className="w-full max-w-337.5 mx-auto">
          <PolicyView policy={policy} />
        </div>
      </section>
      <LogoCloudSection />
    </main>
  );
}

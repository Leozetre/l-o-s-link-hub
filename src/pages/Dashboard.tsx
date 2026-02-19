import { useState, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, CartesianGrid,
} from "recharts";
import { Eye, MousePointerClick, Users, TrendingUp, AlertTriangle, Lightbulb, Download } from "lucide-react";

const COLORS = ["hsl(168,100%,33%)", "hsl(168,80%,28%)", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899"];
const ADMIN_PASSWORD = "minimal2024";

// ─── Password Gate ───
const PasswordGate = ({ onAuth }: { onAuth: () => void }) => {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [locked, setLocked] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const tryAuth = () => {
    if (pw === ADMIN_PASSWORD) {
      onAuth();
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setError(true);
      if (next >= 3) setLocked(true);
    }
  };

  if (locked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold text-foreground mb-2">404</h1>
          <p className="text-muted-foreground text-sm">Page not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-xs flex flex-col gap-4">
        <input
          type="password"
          placeholder="PIN"
          value={pw}
          onChange={(e) => { setPw(e.target.value); setError(false); }}
          onKeyDown={(e) => { if (e.key === "Enter") tryAuth(); }}
          className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground text-sm text-center tracking-[0.3em] focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {error && <p className="text-xs text-destructive text-center">PIN incorreto</p>}
        <button
          onClick={tryAuth}
          className="px-4 py-3 rounded-xl bg-primary text-primary-foreground font-bold text-sm"
        >
          Entrar
        </button>
      </div>
    </div>
  );
};

// ─── KPI Card ───
const KpiCard = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) => (
  <div className="flex flex-col gap-1 p-4 rounded-xl border border-border/40 bg-card/50">
    <div className="flex items-center gap-2 text-muted-foreground">
      {icon}
      <span className="text-[11px] font-semibold uppercase tracking-wide">{label}</span>
    </div>
    <span className="text-2xl font-extrabold text-foreground">{value}</span>
  </div>
);

// ─── Main Dashboard ───
const DashboardContent = () => {
  const [days, setDays] = useState(7);
  const [eventFilter, setEventFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [utmFilter, setUtmFilter] = useState("");

  const since = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d.toISOString();
  }, [days]);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["hub_events", days],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hub_events")
        .select("*")
        .gte("created_at", since)
        .order("created_at", { ascending: false })
        .limit(5000);
      if (error) throw error;
      return data || [];
    },
    refetchInterval: 30000,
  });

  // Apply filters
  const filtered = useMemo(() => {
    let f = events;
    if (eventFilter !== "all") f = f.filter((e) => e.event_name === eventFilter);
    if (categoryFilter !== "all") f = f.filter((e) => e.category === categoryFilter);
    if (utmFilter) f = f.filter((e) => e.utm_campaign?.toLowerCase().includes(utmFilter.toLowerCase()));
    return f;
  }, [events, eventFilter, categoryFilter, utmFilter]);

  // KPIs
  const sessions = new Set(events.map((e) => e.session_id)).size;
  const pageViews = events.filter((e) => e.event_name === "page_view").length;
  const clicks = events.filter((e) => e.event_name !== "page_view").length;
  const ctr = sessions > 0 ? ((clicks / sessions) * 100).toFixed(1) : "0";
  const primaryClicks = events.filter((e) => e.category === "primary").length;
  const topCta = events
    .filter((e) => e.event_name !== "page_view" && e.button_name)
    .reduce((acc, e) => { acc[e.button_name!] = (acc[e.button_name!] || 0) + 1; return acc; }, {} as Record<string, number>);
  const topCtaName = Object.entries(topCta).sort((a, b) => b[1] - a[1])[0];

  // Daily time series
  const dailyData = useMemo(() => {
    const map: Record<string, { date: string; sessions: Set<string>; clicks: number }> = {};
    events.forEach((e) => {
      const d = e.created_at.slice(0, 10);
      if (!map[d]) map[d] = { date: d, sessions: new Set(), clicks: 0 };
      map[d].sessions.add(e.session_id);
      if (e.event_name !== "page_view") map[d].clicks++;
    });
    return Object.values(map)
      .map((v) => ({ date: v.date, sessions: v.sessions.size, clicks: v.clicks }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [events]);

  // Top buttons
  const buttonRanking = useMemo(() => {
    const map: Record<string, number> = {};
    filtered.filter((e) => e.button_name).forEach((e) => { map[e.button_name!] = (map[e.button_name!] || 0) + 1; });
    return Object.entries(map).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 10);
  }, [filtered]);

  // Category breakdown
  const categoryData = useMemo(() => {
    const map: Record<string, number> = {};
    filtered.filter((e) => e.category).forEach((e) => { map[e.category!] = (map[e.category!] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [filtered]);

  // UTM table
  const utmTable = useMemo(() => {
    const map: Record<string, { sessions: Set<string>; clicks: number }> = {};
    events.filter((e) => e.utm_campaign).forEach((e) => {
      const k = e.utm_campaign!;
      if (!map[k]) map[k] = { sessions: new Set(), clicks: 0 };
      map[k].sessions.add(e.session_id);
      if (e.event_name !== "page_view") map[k].clicks++;
    });
    return Object.entries(map).map(([campaign, v]) => ({
      campaign,
      sessions: v.sessions.size,
      clicks: v.clicks,
      ctr: v.sessions.size > 0 ? ((v.clicks / v.sessions.size) * 100).toFixed(1) : "0",
    })).sort((a, b) => b.sessions - a.sessions);
  }, [events]);

  // Referrer table
  const referrerTable = useMemo(() => {
    const map: Record<string, { sessions: Set<string>; clicks: number }> = {};
    events.filter((e) => e.referrer).forEach((e) => {
      let r: string;
      try { r = new URL(e.referrer!).hostname; } catch { r = e.referrer!; }
      if (!map[r]) map[r] = { sessions: new Set(), clicks: 0 };
      map[r].sessions.add(e.session_id);
      if (e.event_name !== "page_view") map[r].clicks++;
    });
    return Object.entries(map).map(([source, v]) => ({
      source,
      sessions: v.sessions.size,
      clicks: v.clicks,
    })).sort((a, b) => b.sessions - a.sessions).slice(0, 10);
  }, [events]);

  // Diagnostics
  const diagnostics = useMemo(() => {
    const issues: { type: "warning" | "info"; message: string }[] = [];

    // Low CTR buttons
    const btnStats: Record<string, { impressions: number; clicks: number }> = {};
    events.forEach((e) => {
      if (e.button_name) {
        if (!btnStats[e.button_name]) btnStats[e.button_name] = { impressions: sessions, clicks: 0 };
        if (e.event_name !== "page_view") btnStats[e.button_name].clicks++;
      }
    });
    Object.entries(btnStats).forEach(([name, s]) => {
      const btnCtr = s.impressions > 0 ? (s.clicks / s.impressions) * 100 : 0;
      if (btnCtr < 2 && s.clicks > 0) {
        issues.push({ type: "warning", message: `"${name}" tem CTR baixo (${btnCtr.toFixed(1)}%)` });
      }
    });

    // High session, low click campaigns
    utmTable.forEach((u) => {
      if (u.sessions > 5 && parseFloat(u.ctr) < 5) {
        issues.push({ type: "warning", message: `Campanha "${u.campaign}" tem ${u.sessions} sessões mas CTR de ${u.ctr}%` });
      }
    });

    // Spike detection
    if (dailyData.length >= 3) {
      const avg = dailyData.reduce((s, d) => s + d.sessions, 0) / dailyData.length;
      dailyData.forEach((d) => {
        if (d.sessions > avg * 2.5 && d.sessions > 10) {
          issues.push({ type: "info", message: `Pico incomum em ${d.date}: ${d.sessions} sessões (média: ${avg.toFixed(0)})` });
        }
      });
    }

    return issues.slice(0, 5);
  }, [events, sessions, utmTable, dailyData]);

  // Recommendations
  const recommendations = useMemo(() => {
    const recs: string[] = [];
    if (primaryClicks === 0 && clicks > 0) {
      recs.push("Nenhum clique no CTA primário. Considere torná-lo mais visível ou ajustar a copy.");
    } else if (sessions > 0 && (primaryClicks / sessions) < 0.1) {
      recs.push("Menos de 10% das sessões clicam no CTA principal. Teste uma copy mais direta.");
    }
    if (categoryData.find((c) => c.name === "conteudo" && c.value > primaryClicks)) {
      recs.push("Links de conteúdo recebem mais cliques que o CTA. Reavalie a hierarquia visual.");
    }
    const mobileEvents = events.filter((e) => e.device_type === "mobile").length;
    if (events.length > 0 && (mobileEvents / events.length) > 0.7) {
      recs.push("70%+ do tráfego é mobile. Priorize a experiência mobile no design.");
    }
    if (recs.length === 0) recs.push("Colete mais dados para gerar recomendações automáticas.");
    return recs.slice(0, 3);
  }, [events, primaryClicks, clicks, sessions, categoryData]);

  const categories = ["all", ...new Set(events.map((e) => e.category).filter(Boolean))];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-foreground">Dashboard — Link Hub</h1>
          <button
            onClick={() => {
              const headers = ["created_at","event_name","session_id","page_path","button_name","category","href","referrer","utm_source","utm_medium","utm_campaign","utm_content","device_type"];
              const csv = [headers.join(","), ...filtered.map(e => headers.map(h => `"${(e as any)[h] ?? ""}"`).join(","))].join("\n");
              const blob = new Blob([csv], { type: "text/csv" });
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a"); a.href = url; a.download = `hub_events_${new Date().toISOString().slice(0,10)}.csv`; a.click();
              URL.revokeObjectURL(url);
            }}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-card text-foreground text-xs hover:bg-accent transition-colors"
          >
            <Download size={14} /> Exportar CSV
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2">
          <select value={days} onChange={(e) => setDays(Number(e.target.value))} className="px-3 py-2 rounded-lg border border-border bg-card text-foreground text-xs">
            <option value={7}>Últimos 7 dias</option>
            <option value={14}>Últimos 14 dias</option>
            <option value={30}>Últimos 30 dias</option>
            <option value={90}>Últimos 90 dias</option>
          </select>
          <select value={eventFilter} onChange={(e) => setEventFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-border bg-card text-foreground text-xs">
            <option value="all">Todos eventos</option>
            <option value="page_view">Page View</option>
            <option value="button_click">Button Click</option>
            <option value="outbound_click">Outbound Click</option>
          </select>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-border bg-card text-foreground text-xs">
            {categories.map((c) => (
              <option key={c} value={c}>{c === "all" ? "Todas categorias" : c}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Filtrar campanha UTM..."
            value={utmFilter}
            onChange={(e) => setUtmFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-card text-foreground text-xs w-44"
          />
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <KpiCard icon={<Users size={14} />} label="Sessões" value={sessions} />
          <KpiCard icon={<Eye size={14} />} label="Page Views" value={pageViews} />
          <KpiCard icon={<MousePointerClick size={14} />} label="Cliques" value={clicks} />
          <KpiCard icon={<TrendingUp size={14} />} label="CTR" value={`${ctr}%`} />
          <KpiCard icon={<MousePointerClick size={14} />} label="Top CTA" value={topCtaName ? `${topCtaName[1]}` : "—"} />
          <KpiCard icon={<TrendingUp size={14} />} label="Cliques Primários" value={primaryClicks} />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Time series */}
          <div className="p-4 rounded-xl border border-border/40 bg-card/50">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Sessões e Cliques por Dia</h3>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(0 0% 20%)" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: "hsl(0 0% 55%)" }} tickFormatter={(v) => v.slice(5)} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(0 0% 55%)" }} />
                <Tooltip contentStyle={{ background: "hsl(0 0% 10%)", border: "1px solid hsl(0 0% 20%)", borderRadius: 8, fontSize: 12 }} />
                <Line type="monotone" dataKey="sessions" stroke="hsl(168 100% 33%)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="clicks" stroke="#F59E0B" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Top buttons bar chart */}
          <div className="p-4 rounded-xl border border-border/40 bg-card/50">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Top Botões Clicados</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={buttonRanking} layout="vertical">
                <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(0 0% 55%)" }} />
                <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 10, fill: "hsl(0 0% 55%)" }} />
                <Tooltip contentStyle={{ background: "hsl(0 0% 10%)", border: "1px solid hsl(0 0% 20%)", borderRadius: 8, fontSize: 12 }} />
                <Bar dataKey="count" fill="hsl(168 100% 33%)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category pie + UTM table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Pie chart */}
          <div className="p-4 rounded-xl border border-border/40 bg-card/50">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Cliques por Categoria</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {categoryData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(0 0% 10%)", border: "1px solid hsl(0 0% 20%)", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* UTM table */}
          <div className="p-4 rounded-xl border border-border/40 bg-card/50 overflow-x-auto">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Performance por Campanha UTM</h3>
            {utmTable.length === 0 ? (
              <p className="text-xs text-muted-foreground">Nenhuma campanha UTM detectada ainda.</p>
            ) : (
              <table className="w-full text-xs">
                <thead><tr className="text-muted-foreground text-left">
                  <th className="pb-2">Campanha</th><th className="pb-2">Sessões</th><th className="pb-2">Cliques</th><th className="pb-2">CTR</th>
                </tr></thead>
                <tbody>
                  {utmTable.map((r) => (
                    <tr key={r.campaign} className="border-t border-border/20">
                      <td className="py-1.5 font-medium text-foreground">{r.campaign}</td>
                      <td className="py-1.5 text-muted-foreground">{r.sessions}</td>
                      <td className="py-1.5 text-muted-foreground">{r.clicks}</td>
                      <td className="py-1.5 text-muted-foreground">{r.ctr}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Referrer table */}
        <div className="p-4 rounded-xl border border-border/40 bg-card/50 overflow-x-auto">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3">Referrers (Origens)</h3>
          {referrerTable.length === 0 ? (
            <p className="text-xs text-muted-foreground">Nenhum referrer detectado ainda.</p>
          ) : (
            <table className="w-full text-xs">
              <thead><tr className="text-muted-foreground text-left">
                <th className="pb-2">Origem</th><th className="pb-2">Sessões</th><th className="pb-2">Cliques</th>
              </tr></thead>
              <tbody>
                {referrerTable.map((r) => (
                  <tr key={r.source} className="border-t border-border/20">
                    <td className="py-1.5 font-medium text-foreground">{r.source}</td>
                    <td className="py-1.5 text-muted-foreground">{r.sessions}</td>
                    <td className="py-1.5 text-muted-foreground">{r.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Diagnostics + Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl border border-border/40 bg-card/50">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3 flex items-center gap-1.5">
              <AlertTriangle size={14} /> Diagnósticos
            </h3>
            {diagnostics.length === 0 ? (
              <p className="text-xs text-muted-foreground">Nenhum problema detectado.</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {diagnostics.map((d, i) => (
                  <li key={i} className={`text-xs ${d.type === "warning" ? "text-amber-400" : "text-muted-foreground"}`}>
                    {d.type === "warning" ? "⚠️" : "ℹ️"} {d.message}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="p-4 rounded-xl border border-border/40 bg-card/50">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase mb-3 flex items-center gap-1.5">
              <Lightbulb size={14} /> Recomendações
            </h3>
            <ul className="flex flex-col gap-2">
              {recommendations.map((r, i) => (
                <li key={i} className="text-xs text-foreground">💡 {r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Exported Page with Password Gate ───
const Dashboard = () => {
  const [authed, setAuthed] = useState(false);
  if (!authed) return <PasswordGate onAuth={() => setAuthed(true)} />;
  return <DashboardContent />;
};

export default Dashboard;

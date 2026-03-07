"""
Unified shipment data service. All data comes from Supabase datasets.
Requires SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) in .env.
"""


def load_shipments():
    from services.supabase_service import load_shipments as _load
    return _load()


def get_aggregate_stats():
    from services.supabase_service import get_aggregate_stats as _fn
    return _fn()


def get_risk_context_for_route(origin_country: str, destination: str, part_type: str = None):
    from services.supabase_service import get_risk_context_for_route as _fn
    return _fn(origin_country, destination, part_type)


def get_delay_probability(origin_country: str, destination: str, transport_mode: str = ""):
    from services.supabase_service import get_delay_probability as _fn
    return _fn(origin_country, destination, transport_mode)


def get_unprecedented_event_probability(origin_country: str, active_events: list):
    from services.supabase_service import get_unprecedented_event_probability as _fn
    return _fn(origin_country, active_events)


def load_shipment_events(shipment_id: str = None, limit: int = 100):
    from services.supabase_service import load_shipment_events as _fn
    return _fn(shipment_id, limit)


def get_event_log_stats():
    from services.supabase_service import get_event_log_stats as _fn
    return _fn()
